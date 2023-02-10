import React from 'react';
import './App.css';
import DiceChart from "./components/DiceChart";
import BestscoreVsTotalpoolChart from "./components/SatChart/BestscoreVsTotalpoolChart";
import Typography from "@material-ui/core/Typography";
import AveragePercentile from "./components/AveragePercentile";
import {Link} from "@material-ui/core";
import SecretaryChart from "./components/SecretaryCharts/SecretaryChart";
import DistributionComparison from "./components/DistributionComparison"

function App() {
    return (
        <Typography className="App">
            <Typography variant={"h2"}>The Secretary Problem</Typography>
        	<p>It’s possible to find the very best candidate with about a 37% success rate within a large pool of candidates, whether a hundred or a trillion, with the secretary algorithm. The conditions are that we have to evaluate one candidate at a time, stop once a candidate has been chosen, and evaluate in a random order. Additionally, It uses an "optimal stopping" rule where the first X number of candidates has to be rejected, regardless of their performance. Then we pick the first candidate that performs better than all of the X number of candidates rejected.</p>
        	<p>The optimal stopping rule that will achieve that result is called 36.8%, or "1/e" (‘e’ being Euler’s number). Given a pool of 100 candidates, the first 37 are evaluated then rejected, regardless of their performance. Then the first candidate better than the 37 rejected from the remaining 63 is chosen.</p>
        	<p>This strategy is failure-prone and restrictive, however. There's a 37% chance the best candidate of the 100 is within the first 37 rejected. That means we will get to the end of the candidate list without choosing a candidate because we would be trying to find a candidate better than the best.</p>
        	<p>In contrast, there are more lax stopping rules like 25% and √N (N being the total number of candidates). The chosen candidate will be worse on average, but there's less chance of failing and the candidate will be found earlier.</p>

            <SecretaryChart/>
        	<p>
        	When working with large population sizes, √N may be preferable since the stopping threshold would grow by root rather than linearly. We wouldn’t have to evaluate and reject such a large number of candidates before picking one. The chosen candidate's rank would be lower, however, but the percentile differences between each successive candidate are less in larger populations on average.
        	</p>

            <AveragePercentile/>
            <Typography variant={"caption"}>Candidate Percentile Mean = (Total Population - (Candidate Rank - 1)) /
                (Total
                Population + 1)</Typography>
                <h1>What makes a good candidate?</h1>
                <p>When we look at the distribution of scores for the SAT in a year (<Link        href="https://web.archive.org/web/20170106113421/https://secure-media.collegeboard.org/digitalServices/pdf/sat/sat-percentile-ranks-composite-crit-reading-math-writing-2015.pdf"
            	target="_blank" rel="noopener noreferrer">
            	College Board’s 2015 dataset
        	</Link>), it resembles a normal distribution, or a bell curve, where most people score near the mean and very few in the outlier ranges. I believe this phenomenon occurs because the requirements to score near the mean are very flexible and include many candidates. Someone can be talented at SAT tests, take it sleep deprived, and score somewhere in the mean. Someone could also be naturally bad at SAT tests, do a good amount of prep, then score similarly. There isn't a particular description you have to fit to score near the mean since many are acceptable.</p>
<p>But to score at the extreme outlier ranges, there isn't much leeway. You can't be naturally bad at taking SAT tests and can't be uninterested in doing well. You can't just take it once, and you can't be bad at a single SAT topic. You have to have it all—or be extremely exceptional in some aspects to make up for the others. Only those who can handle being in that limited description can achieve outlier scores.</p>
<p>Looking at dice rolls can be a good analogy to give a different perspective. If we roll a single die enough times, we will get a uniform distribution of results. With two dice, it will look like a triangle because there are more ways to achieve the mean, 7, than an outlier like 2. And as we keep adding more dice, the graph will resemble a normal distribution. There are far more combinations of rolls in the middle than the ends.</p>


<DiceChart/>

<h1>Learning from the rejected candidates</h1>

<p>The secretary approach isn't always the most practical approach since it’s not like we always have to evaluate and reject one candidate at a time with no going back. Real life situations can differ. But the insightful thing about it is the stopping rule. By evaluating some number of candidates before deciding, we better understand the pool of candidates we’re looking at. This is especially important when exploring an unfamiliar pool of candidates since we would initially have little to no understanding of what makes a "good" candidate.</p>
<p>The chart below calculates the best candidate from the 2015 College Board dataset given probability (AKA luck) and number of candidates evaluated when chosen at random. For example, with 65 candidates, there’s a 50% probability a 99.03 percentile (2250) candidate will be found.</p>
<BestscoreVsTotalpoolChart chartDimension={[800,500]}/>
<h1>“Big fish, small pond”</h1>
<p>The chart earlier is based on a perfect representation of all the SAT test takers in 2015. Sample bias is extremely common–even if we’re trying to avoid it. Our particular distribution may be very different from the actual global distribution. A candidate may be 99.03 percentile in our pool, but if that distribution is relatively poor in performance, that “99.03 percentile candidate” may be just a 70 percentile candidate globally.</p>
<p>The benefits of finding a better distribution can be immense, and the chart below is an attempt to illustrate that. There are 3 populations being compared to each other:</p> 

<ul>
    <li>Yellow: local CSULB students, who were given admission preferences</li>
    <li>Blue: non-local CSULB students.</li>
    <li>Red: Harvard students.</li></ul>
<DistributionComparison/>
<p>One surprising thing to me is that the blue (non-local) distribution yields qualified candidates far more quickly than the yellow (local) distribution despite only having a slightly (arguably) higher mean. At 50% probability, it takes 15 non-local students to find a candidate who scored at least a 1400 compared to 76 local students. My takeaway is that even a small change in behavior when picking candidates can make a large difference. And a larger change in behavior, such as evaluating candidates from Harvard for SAT scores, can make an unimaginable difference.</p>
<h1>Other considerations</h1>
<h3>Picking poorer performing population</h3>
<p>It’s sometimes preferable to pick a poorer performing population. Sometimes candidates have a will of their own and can reject the evaluator, and poorer performing populations may not reject as often.</p>
<p>It can also be less expensive in terms of costs, speed, effort, etc. too, making it much easier to evaluate a larger number of candidates to find outliers.</p>
<p>However, a distribution that is poorer performing doesn't always mean that candidates will reject the evaluator less or that they'll be more expensive to evaluate. Sometimes the opposite is true, and it's something to keep in mind since it can feel unintuitive.</p>
<h3>Number of candidates to evaluate</h3>
<p>Diverse normal distributions (large standard deviations or wide bell curves) have outliers that perform much better than mean performers (like CSULB for SAT) compared to relatively homogeneous distributions (like Harvard for SAT). For those diverse populations, it can be more beneficial to evaluate a larger number of candidates to find those outliers.</p>
<h1>Motivation</h1>
<p>I find that there’s immense pressure to seek the best out there, whether a partner, job, house, or Node package for that obscure React app no one will look at. But it can be for a good reason. Many of these decisions can have huge impacts in our lives, and putting in the effort and being patient in making the right decision can be absolutely worth it.</p> 
<br/>
<br/><br/><br/><br/><br/><br/><br/>        </Typography>
    );
}

export default App;
