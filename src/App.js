import './App.css'
import TransformHeroes from './TransformHeroes';
import Profile from "./profile.jpg"

function App() {
  return (
    <section>
      <div id="yourimg1" class="card rounded is-out">
        <div class="card__overlay"></div>
        <div class="card__heading">
          <img src={Profile} title={"profile"} alt="profile"/>
          <TransformHeroes/>
        </div>
      </div>
    </section>
  );
}

export default App;
