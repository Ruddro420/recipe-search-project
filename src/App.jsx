/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [getInput, setGetInput] = useState('')
  const [timer, setTimer] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=a')
      .then(res => res.json())
      .then(loadData => setData(loadData.meals))
    setLoading(true)
  }, [])

  // Main Function

  const inputChanged = e => {
    setGetInput(e.target.value)

    clearTimeout(timer)

    const newTimer = setTimeout(() => {
      // Api Call 
      async function getMeal() {
        try {
          const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${getInput}`);
          setData(response.data.meals);
        } catch (error) {
          console.error(error);
        }
      }
      getMeal()
    }, 500)
    setTimer(newTimer)
  }

  return (
    <>
      <section className="main-container">
        <div className="search-container">
          <div className="heading-container">
            <h1>Recipe Search</h1>
            <p>Search recipes from all over the world</p> <br />
          </div>
          <input onChange={inputChanged} type="text" placeholder="Type Recipe" className="input input-bordered input-secondary w-full max-w-xs" />
        </div>
        <hr />
        <MealShow loading={loading} data={data}></MealShow>
      </section>
      <Footer></Footer>
    </>
  )
}

// Meal Show

function MealShow({ data, loading }) {
  return (
    <>
      {
        loading ? <div className='Load-Data'>
          {
            data !== null ? <div className="meal-container">
              {
                data?.map((item) => {
                  return <div key={item.idMeal} className="card w-96 bg-base-100 shadow-xl mt-5 mb-10">
                    <figure><img src={item.strMealThumb} alt="Shoes" /></figure>
                    <div className="card-body">
                      <h2 className="card-title">
                        {item.strMeal}
                        <div className="badge badge-secondary">NEW</div>
                      </h2>
                      <p>{item.strInstructions.slice(0, 100)}..</p>
                      <div className="card-actions justify-end">
                        <div className="badge badge-outline">{item.strCategory}</div>
                        <div className="badge badge-outline">{item.strIngredient1}</div>
                      </div>
                    </div>
                  </div>
                }
                )
              }
            </div>
              :
              // Alert Show
              <div className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>No Recipe Found !! Search Right Recipe</span>
              </div>
          }
        </div>
          :
          // Load Spinner
          <div className='text-center'>
            <span className="loading loading-bars loading-xs"></span>
            <span className="loading loading-bars loading-sm"></span>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span>
          </div>
      }


    </>
  )
}

// Footer Function
function Footer() {
  return (
    <>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div>
          <p>Copyright © 2023 - All right reserved by University Project</p>
        </div>
      </footer>
    </>
  )
}

export default App
