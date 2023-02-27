
import OriginalPieceHit from './components/OriginalPieceHit';
// import UserPieceHit from './UserPieceHit';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/global.css';
import Staffs from './components/Staffs';
import LandingPage from './components/LandingPage';
import { AiFillGithub } from 'react-icons/ai';
import { Routes, Route } from 'react-router-dom';

// import sampleDrumHits from './sampleDrumHits';
import sampleDrumHits from './components/sampleDrumHits';
import SheetDisplay from './components/SheetDisplay';
import RecorderJSDemo from './components/RecorderJSDemo';
import AnalysisPage from './components/AnalysisPage';


function App() {

  return (
    <div>
      <div className="buttons">
        <button 
          onClick={() => window.open('https://forms.gle/9ouoLRY1ms3VBe4TA')} 
          className='feedback-button'>
            <b>Submit Feedback</b>
          </button>
        <button 
          onClick={() => window.open('https://github.com/ishandvd/dissertation')} 
          className='see-code'>
            <b>See the Code</b> <AiFillGithub/>
          </button>
      </div>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="analysis" element={<AnalysisPage />} />
    </Routes>
    </div>
  );
}

export default App;
