import React from 'react';
import './App.css';
import DiceChart from "./components/DiceChart";
import SatChart from "./components/SatChart";
import Typography from "@material-ui/core/Typography";
import AveragePercentile from "./components/AveragePercentile";
import {Link} from "@material-ui/core";
import SecretaryChart from "./components/SecretaryCharts/SecretaryChart";

function App() {
    return (
        <Typography className="App">
            <Typography variant={"h2"}>The Secretary Problem</Typography>
            <p>If you absolutely need to find the best candidate in a limited pool, and if you can only judge
                one candidate at a time and can't go back, consider the secretary algorithm. It uses an "optimal
                stopping"
                approach by always rejecting the first X amount of candidates before accepting one. Done
                correctly, that candidate will very likely be rank 1 or 2 of the entire pool.</p>
            <p>But it depends on the stopping strategy. A popular one is the 36.8%, or "1/e", approach where the first
                36.8% of the total candidates are rejected. If
                we have 100 candidates to choose from, we would evaluate then reject the first 37 candidates. It doesn't
                matter how good
                they are. The rule is to always reject them. Then pick the first of the remaining 63 candidates that is
                better than all of the 37 rejected.</p>
            <p>
                This strategy is failure-prone and restrictive, however. There's a 37% chance the best candidate of the
                100
                is within the first 37 rejected. That means we will get to the end of the candidate list without
                choosing anyone because we would be trying to find a candidate better than the best. And the fact is
                that at minimum, we have to reject 37 candidates.</p>
            <p>There are more lax strategies like the 25% approach or the sqrt(N) (e.g. total pool is 64, so reject
                first 8) approach. The found candidate will be
                ranked worse on average, but there's less chance of failing and the candidate will be found earlier on
                average.</p>
            <SecretaryChart/>
            <p>
                The sqrt(N) strategy is unique compared to fixed percentage approaches because it adapts to the
                population size.
                As the total pool increases, the stopping rule threshold barely increases rather than grows linearly.
                Despite selecting lower
                ranked candidates on average, it can be preferred for large pool sizes, even if we're not trying to be
                pragmatic. In large sample populations, the percentile difference between the sampled population
                becomes quite minimal when compared to the entire population. The opposite is true
                as well. In small sample populations, the difference in the candidate's percentile is large.
            </p>
            <AveragePercentile/>
            <Typography variant={"caption"}>Candidate Percentile Mean = (Total Population - (Candidate Rank - 1)) /
                (Total
                Population + 1)</Typography>
            <p>
                To help put these percentiles into context, analyzing SAT scores can help. CollegeBoard used
                to release detailed breakdowns of all SAT test scores achieved in the year, and
                the <Link
                href="https://web.archive.org/web/20170106113421/https://secure-media.collegeboard.org/digitalServices/pdf/sat/sat-percentile-ranks-composite-crit-reading-math-writing-2015.pdf"
                target="_blank" rel="noopener noreferrer">
                2015 dataset
            </Link> was the last of it (they still release data yearly but with less information).
            </p>
            <p>
                Every year though,
                the distribution more or less follows a normal distribution. Most people tend
                towards the median, so the difference
                between, say, the 30 percentile and the 70 percentile isn't that much considering the large difference
                in percentile. According to the 2015 data, it would be 350 points. And when approaching outliers, the
                difference per percentile is more significant.
                The difference between the 98.02 percentile and the 99.98 percentile is 220 points despite only being
                roughly 2 percentiles apart.
            </p>
            <p>
                I struggled to accept this because I believed improvement followed the law of diminishing
                returns.
                It should have been much harder to improve from 2300 to 2400 compared to from 1400 to 1500. Yet just
                going
                up the percentile slightly at those outlier ranges, the scores jumped a lot more compared to the range
                around the median. But at this point, I wasn't really questioning the
                SAT data but more about why normal distributions can appear naturally.
            </p>
            <p>
                If we roll a single die enough times, we will get a uniform distribution of results.
                With two dice, it will look like a
                triangle because there are more ways to achieve 7 than 2. And when we keep adding more dice, the
                data points quickly begin to resemble a normal distribution. There are more combinations of rolls
                that land closer to the median value than the ones at the ends.
            </p>
            <DiceChart/>
            <p>
                With the SAT score distribution, the explanation
                may not be as simple as analyzing dice rolls combinations, but there are
                similarities. Scoring around the median is more common because the requirements to score at that range
                are flexible. Maybe someone is a good test taker but didn't study much. Maybe someone else is bad at
                taking tests but studied a lot. There isn't a particular description you have to fit in order to score
                near the median since many are acceptable.
            </p>
            <p>
                But to score at the outlier ranges (particularly at extreme outlier ranges like 2350+), I'd imagine
                there isn't as much leeway. You can't be
                naturally bad at taking tests, and you can't be uninterested in doing well. You can't just take it
                once, and you can't just take one prep course. It can be quite brutal since there
                are so many more filters applied at these outlier ranges that only candidates that meet a particular
                description can meet them.
            </p>
            <h1>A Plan and Review Approach</h1>

            <p>
                The secretary approach isn't always the most practical approach since we may be able to select a
                candidate we previously evaluated. But the insightful thing about it is the stopping
                rule. By evaluating some number of candidates before deciding,
                we can get a better understanding of the candidates a particular behavior yields. This is
                especially important when exploring an unfamiliar field since we often have little to no
                understanding of what makes a "good" candidate. The "review"
                portion of the chart below is meant to help with that.
            </p>
            <p>
                The "planning" portion is more of a fun exercise in my opinion. I put less weight in it since a lot of
                it depends on chance whereas when "reviewing," you can more accurately judge your luck. But if you need
                to be very efficient when dedicating resources to evaluate candidates, it can be
                useful.
            </p>
            <SatChart/>
            <p>
                These simulations make two big assumptions. The population follows a distribution that the SAT
                has and that
                we select candidates randomly. The chart can also mislead us
                into believing that 99 percentile means a 2220 score overall, whereas it just means compared
                to the population our behavior is yielding. If we sample 50 pancakes at Applebee's, the best one is
                likely to be around a
                "2220/2400," but it's relative to pancakes made at that particular Applebee's. Relative to world, or
                overall,
                it probably doesn't rank as high.
            </p>
            <p></p>
            <p>
                I think that's pretty neat though. You can get a really good picture a particular behavior yields by
                evaluating just a moderate number of candidates. You can then make a decision of needing to evaluate
                more candidates or stopping. I believe this issue is more relevant now than in the past due to the
                increase "fear of missing out" feeling we can experience due having so many options with modern
                technology.
            </p>

        </Typography>
    );
}

export default App;
