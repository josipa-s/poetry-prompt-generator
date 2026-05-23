async function generatePrompt(theme) {
  try {
    const themeMap = {
      general: "",
      nature: "outdoors,forest,ocean,flowers,sky",
      romance: "love,romance,relationship",
      dream: "dream,surreal,magic,mystery",
      melancholy: "melancholy,grief,loneliness,depression,sad",
      fantasy: "fantasy,mythology,magic,fiction",
      spirituality: "spirituality,soul,faith,divine,heaven",
      nostalgia: "memory,past,time,longing,homesick",
      darkness: "darkness,gothic,shadow,ruins"
    };

    const baseUrl = 'https://api.datamuse.com/words';

    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let randomInd = Math.floor(Math.random() * letters.length);
    const randomLetter = letters.at(randomInd);

    const middleWordParams = new URLSearchParams({
      sp: `${randomLetter}*`,
      md: 'p',
      topics: themeMap[theme],
      max: 300
    });
    const middleRes = await fetch(`${baseUrl}?${middleWordParams}`);
    const middleJson = await middleRes.json();
    const nouns = middleJson.filter((item) => item.tags.includes('n'));
    const middleWord = nouns.at(randomInd)['word'];

    const firstWordParams = new URLSearchParams({
      rel_jjb: middleWord,
      topics: themeMap[theme],
      max: 200
    });
    const firstRes = await fetch(`${baseUrl}?${firstWordParams}`)
    let json = await firstRes.json();
    randomInd = Math.floor(Math.random() * json.length);
    const firstWord = json.at(randomInd)['word'];

    const lastWordParams = new URLSearchParams({
      rel_trg: middleWord,
      topics: themeMap[theme],
      max: 200
    });

    const lastRes = await fetch(`${baseUrl}?${lastWordParams}`);
    json = await lastRes.json();
    randomInd = Math.floor(Math.random() * json.length);
    const lastWord = json.at(randomInd)['word'];

  return {firstWord, middleWord, lastWord}

  } catch (error) {
    return generatePrompt(theme);
  }

}

export function Form({setPrompt}) {

  const handleSubmit = async (event) => {
    event.preventDefault();
    const theme = event.target.elements.theme.value;
    const {firstWord, middleWord, lastWord} = await generatePrompt(theme);
    setPrompt(`${firstWord} ${middleWord} ${lastWord}`)
  }
  
    return (
         <form onSubmit={handleSubmit}>
          <select name="theme" defaultValue="general">
            <option value="">any theme</option>
            <option value="nature">nature</option>
            <option value="romance">romance</option>
            <option value="dream">dreamlike</option>
            <option value="melancholy">melancholy</option>
            <option value="fantasy">fantasy</option>
            <option value="spirituality">spiritual</option>
            <option value="nostalgia">nostalgic</option>
            <option value="darkness">dark/gothic</option>
          </select>
        <button type="submit">Generate</button>
        </form>
    )
}
