
import OriginalPieceHit from './components/OriginalPieceHit';
// import UserPieceHit from './UserPieceHit';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/global.css';
import Staffs from './components/Staffs';
import LandingPage from './components/LandingPage';
import VisualisationPage from './components/VisualisationPage';
import { AiFillGithub } from 'react-icons/ai';
import { useState } from 'react';

// import sampleDrumHits from './sampleDrumHits';


function App() {

  const [landing, setLanding] = useState(true)

  return (
    <div>
      <div className="buttons">
        <button 
          onClick={() => window.open('https://forms.gle/9ouoLRY1ms3VBe4TA')} 
          className='feedback-button'>
            <b>Submit Feedback</b>
          </button>
        <button 
          onClick={() => window.open('https://github.com/ishandvd/diss')} 
          className='see-code'>
            <b>See the Code</b> <AiFillGithub/>
        </button>
        {landing ? <></> : 
        <button 
          onClick={() => setLanding(true)} 
          className='see-code'>
            <b>Back to Home</b> <AiFillGithub/>
        </button>
        }
      </div>
      {landing ? 
        <LandingPage setLanding={setLanding}/>
        :
        <div>
          <VisualisationPage />
        </div>
      }
    </div>
  );
}

export default App;
