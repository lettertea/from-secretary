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
            <p>It’s possible to find the very best candidate with about a 37% success rate within a large pool of candidates, whether a hundred or a trillion, with the secretary algorithm. The caveat is that we can only evaluate one candidate, must stop once a candidate has been chosen, and evaluate in a uniformly random order. It uses an "optimal stopping" approach where the first X number of candidates has to be rejected then chooses the first candidate that performs better than the X number of candidates rejected.</p>
            <p>The variation that will achieve that result is called the 36.8%, or "1/e" (‘e’ being Euler’s number). Given a pool of 100 candidates, the first 37 are evaluated then rejected, regardless of their performance. Then the first candidate better than the 37 rejected from the remaining 63 is chosen.</p>
            <p>This strategy is failure-prone and restrictive, however. There's a 37% chance the best candidate of the 100 is within the first 37 rejected. That means we will get to the end of the candidate list without choosing a candidate because we would be trying to find a candidate better than the best.</p>
            <p>In contrast, there are more lax strategies like the 25% or sqrt(N) (e.g., total pool, N, is 64, so reject the first 8) approach. The chosen candidate will be worse on average, but there's less chance of failing and the candidate will be found earlier.</p>

            <SecretaryChart/>
            <p>
            When working with large population sizes, the sqrt(N) strategy may be preferable since the stopping threshold would grow by root rather than linearly. Plus in large pools, the overall percentile difference between each candidate rank shrinks.
            </p>
            <AveragePercentile/>
            <Typography variant={"caption"}>Candidate Percentile Mean = (Total Population - (Candidate Rank - 1)) /
                (Total
                Population + 1)</Typography>
                <h1>What is considered a good candidate?</h1>


<p>I looked into SAT scores since it’s relatable to many students (particularly in the US) and that there’s a lot of data available to the public, like <Link
                href="https://web.archive.org/web/20170106113421/https://secure-media.collegeboard.org/digitalServices/pdf/sat/sat-percentile-ranks-composite-crit-reading-math-writing-2015.pdf"
                target="_blank" rel="noopener noreferrer">
                College Board’s 2015 dataset
            </Link>. Every year, the distribution of scores resembles a normal distribution, or a bell curve, where most people score near the average and very few in the outlier ranges.</p>
<p>I believe this conforms to a normal distribution because the requirements to score near the mean are very flexible and include many candidates. Someone can be talented at SAT tests, take it sleep deprived, and score somewhere in the middle. Someone could be naturally bad at SAT tests, do a good amount of prep, then score near the middle again. There isn't a particular description you have to fit to score near the mean since many are acceptable.</p>
<p>But to score at the extreme outlier ranges, there isn't much leeway. I’d imagine at the extreme upper range, you can't be naturally bad at taking SAT tests, and you can't be uninterested in doing well. You can't just take it once, and you can't be bad at a single SAT topic. You have to have it all—or be extremely exceptional in some aspects to make up for the others. Only those who can fit that limited–and often brutal–description can achieve outlier scores.</p>
<p>Looking at dice rolls can be a good analogy to give a different perspective. If we roll a single die enough times, we will get a uniform distribution of results. With two dice, it will look like a triangle because there are more ways to achieve the mean, 7, than an outlier like 2. And when we keep adding more dice, the graph quickly begins to resemble a normal distribution. There are more combinations of rolls near the middle than the ends.</p>

<DiceChart/>

<h1>Learning from the rejected candidates</h1>

<p>The secretary approach isn't always the most practical approach since it’s not like we always have to evaluate and reject one candidate at a time with no going back. Real life situations can differ. But the insightful thing about it is the stopping rule. By evaluating some number of candidates before deciding, we better understand the pool of candidates we’re looking at. This is especially important when exploring an unfamiliar pool of candidates since we often have little to no understanding of what makes a "good" candidate.</p>
<p>The chart below calculates the best candidate (from the 2015 College Board dataset) seen given the probability (AKA luck) and number of candidates evaluated. It can be used to help evaluate how good a distribution is in producing candidates. For example, with 27 candidates evaluated at random, there’s a 50% probability at least a 99 percentile (2250) candidate was found. If that candidate is not sufficient for your needs, it may be best to consider changing how you’re getting candidates.</p>
<BestscoreVsTotalpoolChart chartDimension={[800,500]}/>
<h1>“Big fish, small pond”</h1>
<p>The chart earlier is based on a perfect representation of all the SAT test takers in 2015. Sample bias is extremely common–even if we’re trying to avoid it. Our particular distribution may be very different from the actual global distribution. We can find an outlier 99 percentile candidate. But a 99 percentile candidate within a poorly performing distribution may be, say, a 70 percentile candidate globally.</p>
<p>But before giving up on a distribution, it’s important to understand it first. Sometimes worse performing distributions are preferable. Perhaps they’re faster and more accurate to evaluate, using far less time, money, and effort. The reason can vary so much in practice, so it’s difficult to give a blanket answer.</p>

<h1>Changing ponds</h1>
<p>The benefits of finding a better distribution can be immense, and the chart below is an attempt to illustrate that. There are 3 populations being compared to each other. The yellow distribution consists of local CSULB students, who were given admission preferences, and the blue one consists of non-local students. And the crimson-red distribution consists of Harvard students.</p>
<DistributionComparison/>
<p>One surprising thing to me is that the blue distribution yields qualified candidates far more quickly than the yellow distribution despite it being only slightly better (arguably). My takeaway is that a small change in behavior, despite in the same setting, can make a large difference. And a larger change in behavior, such as going to Harvard, can make an unimaginable difference.</p>
<h1>Motivation</h1>
<p>There’s immense pressure to always seek the best out there, whether a partner, job, house, or Node package for that obscure React app no one will look at. It’s time consuming, frustrating, and stressful. Sometimes you invest so much into a candidate or distribution of candidates, and it doesn’t work out. It’s difficult, and I feel like many people settle or give-up on unideal candidates due to fatigue and overload of decisions.</p>
<p>I encountered the secretary problem mid-2020 (with, presumably, a lot of sudden free time on my hands) from a Reddit post. I found it incredibly relevant and useful, especially given how many choices we have nowadays, ranging from food/products with online delivery, dating apps, and Node packages.</p>
<p>So this article is just a state of my perspective on dealing with this issue. I tend to write things out when I need to think. Not sure how valid this whole approach and perspective is, and I don’t think I’ll ever have enough life experience to make an absolute statement on how things should be done.</p>

        </Typography>
    );
}

export default App;
