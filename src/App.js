import './App.css'
import TransformHeroes from './TransformHeroes';
import video from "./video.mp4"

function App() {
  return (
    <section>
      <div id="yourimg1" class="card rounded is-out">
        <div class="card__overlay"></div>
        <div class="card__heading">
          <video src={video} autoPlay loop muted controls={false} type="video/mp4"></video>
          <TransformHeroes/>
        </div>
      </div>
    </section>
  );
}

export default App;
