import { useEffect, useState } from 'react'
import { ActiveDay } from './Date';
import { Link } from './Link';

function App() {
  const [foodData, setFoodData] = useState(null); // Initialize with null to handle loading state

  useEffect(() => {
    let isMounted = true;

    fetch("https://safka-api.juhanias.dev/api/v1")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (isMounted) {
          console.log(data);
          setFoodData(data);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  let current_day = new Date().getDay();

  if (current_day > 6) {
    current_day = 1
  }

  console.log(current_day)

  return (
    <>
      <main style={{display: 'flex', width: '85%', margin: 'auto', flexDirection: 'column', marginTop: "30px"}}>
        <div style={{display: 'flex', flexDirection: 'column', marginBottom: "30px"}}>
          <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
            <h1>safka.juhanias.dev</h1>
          </div>
          <p>Juhannuskukkulan ruokalan päivittyvä ruokalista</p>
        </div>
        {foodData && foodData.data && Array.isArray(foodData.data) ? (
          <div className='day-list'>  
            {foodData.data.map((element, index) => (
              <ActiveDay
                key={index} 
                date={element.date} 
                food={element.food} 
                inactive={current_day - 1 > index}
                highlighted={current_day - 1 == index}
              />
            ))}
          </div>
        ) : (
          <div>
            <ActiveDay date={"Ladataan sisältöä..."} food={[]}/>
          </div>
        )}
      </main>
      <footer style={{backgroundColor: "rgba(255, 255, 255, 0.2)", marginTop: "20px"}}>
        <div style={{width: '85%', margin: 'auto', paddingTop: '30px', paddingBottom: '30px'}}>
          <b>safka.juhanias.dev</b>
          <Link
            desc={"Github"}
            link={"https://github.com/juhanias/safka.juhanias.dev"}
          />
          <Link
            desc={"Julkinen rajapinta"}
            link={"https://safka-api.juhanias.dev/api/v1"}
          />
          <Link
            desc={"Juhannuskukkulan ruokalista (turkuai.fi)"}
            link={"https://www.turkuai.fi/turun-ammatti-instituutti/opiskelijalle/ruokailu-ja-ruokalistat/ruokalista-juhannuskukkula-topseli"}
          />
          <Link
            desc={"Alkuperäinen inspiraatio - safka.online"}
            link={"https://github.com/Tembero11/Safka/tree/main"}
          />
        </div>
      </footer>
    </>
  );
}

export default App;
