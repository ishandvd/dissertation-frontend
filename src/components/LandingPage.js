import React from 'react'
import { ArrowRight } from 'react-bootstrap-icons';
import { AiOutlineUpload, AiOutlineLineChart } from 'react-icons/ai'
import { GiDrumKit } from 'react-icons/gi'
import colourScheme from './colourScheme';

const LandingPage = ({setLanding}) => {
  return (
    <div className='landing'>
        <h1>Analyse your timing and compare it to a recording!</h1>

        <p align="center">
          <b>
            All you need is your laptop, some 
            headphones, and a drum track to replicate.<br/>
          </b>
            Please note: this tool works best when playing alongside
            a recording that only uses a &nbsp;
            <b>
               hi-hat, snare, and kick drum (and no other instruments).
            </b>
            <br/>
            You should only play these three drums.
        </p>
        <p fontSize={45}>💻  🎧  🥁</p>
        <br/><br/>
        <button className="rounded-circle get-started" onClick={() => setLanding(false)}>Get Started</button>
        <br/><br/>

        <div className="graphic">
          <div className="instruction">
            <h5>
              Upload a drum backing track
            </h5>
            <AiOutlineUpload color={colourScheme.purple} size={80} />
          </div>
          <div className="arrow">
            <ArrowRight size={80} />
          </div>
          <div className="instruction">
            <h5>Record yourself playing along</h5>
            <GiDrumKit color={colourScheme.purple} size={80} />
          </div>
          <div className="arrow">
            <ArrowRight size={80} />
          </div>
          <div className="instruction">
            <h5>Get live feedback!</h5>
            <AiOutlineLineChart color={colourScheme.purple} size={80} />
          </div>
        </div>

        <div className="info">
          <h3><b>Who is this tool for?</b></h3>
          <p>
            Perfect for <b>drum teachers and students!</b> We should never stop learning.
            <br/><br/>
            Human drummers don't play perfectly in sync with a metronome.
            They often play slightly ahead or behind the beat, which can give
            a sense of groove, swing, and feel to a performance.
            <br/><br/>
            If you're trying to practice your timing but are tired of using a metronome
            or you're trying to understand how other drummers play ahead/behind the beat,
            this tool is for you!


          </p>
        </div>

    </div>
  )
}

export default LandingPage
