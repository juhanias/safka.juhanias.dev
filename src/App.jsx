import { useEffect, useState } from 'react'
import { ActiveDay } from './Date';

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

  if (current_day < 5) {
    current_day = 1
  }
  
  console.log(current_day)

  return (
    <>
      <main style={{display: 'flex', width: '85%', margin: 'auto', flexDirection: 'column', marginTop: "30px"}}>
        <div style={{display: 'flex', flexDirection: 'column', marginBottom: "30px"}}>
          <h1>safka.juhanias.dev</h1>
          <p>Juhannuskukkulan ruokalan päivittyvä ruokalista</p>
        </div>
        {foodData && foodData.data && Array.isArray(foodData.data) ? (
          <div>
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
          <p>
            <ActiveDay date={"Ladataan sisältöä..."} food={[]}/>
          </p>
        )}
      </main>
    </>
  );
}

export default App;
