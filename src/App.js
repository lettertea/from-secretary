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
                In many scenarios, we need a candidate that's just "good enough." Sure rank 1 sounds nice, but maybe
                rank 2 would be okay. But then how about 3? And then 4? When should we stop?
            </p>
            <p>
                When it comes to large populations, the difference in ranks becomes quite minimal. The opposite is true
                as well. In small populations, the difference in the candidate's percentile is large.
            </p>
            <AveragePercentile/>
            <Typography variant={"caption"}>Candidate Percentile Mean = (Total Population - (Candidate Rank - 1)) /
                (Total
                Population + 1)</Typography>
            <p>
                But these percentiles just tell us how a candidate compares to their
                population. It doesn't give much value into how they would perform.
            </p>
            <p>
                The answer would depend on the population, but analyzing the data points of released SAT scores can
                help. CollegeBoard used to release detailed breakdowns of all SAT test scores achieved in the year every
                year, and
                the <Link
                href="https://web.archive.org/web/20170106113421/https://secure-media.collegeboard.org/digitalServices/pdf/sat/sat-percentile-ranks-composite-crit-reading-math-writing-2015.pdf"
                target="_blank" rel="noopener noreferrer">
                2015 dataset
            </Link> was the last of it. (They still release data yearly but with less information.) Every year though,
                the
                distribution more or less follows a normal distribution. Most people tend
                towards average, so the difference
                between, say, the 30 percentile and the 70 percentile isn't that much considering the large difference
                in percentile. According to the 2015 data, it would be 350 points. And when approaching outliers, the
                difference per percentile is more significant.
                The difference between the 98.02 percentile and the 99.98 percentile is 220 points.
            </p>
            <p>
                I struggled to accept this because improvement typically follows the law of diminishing
                returns.
                It should be much harder to improve from scoring 2300 to 2400 compared to from 1400 to 1500. Yet just
                going
                up the percentile slightly at those outlier ranges, the scores jump a lot more compared to the range
                around the mean. I thought the
                distribution would be like an upside-down parabola, where there the difference is significantly less at
                the
                outlier ranges. But at this
                point, I wasn't really questioning the
                SAT data but more about why normal distributions exist.
            </p>
            <p>
                If we roll a single die enough times, we will get a uniform distribution of results.
                With two dice, it will look like a
                triangle because there are more ways to achieve 7 than 2. And when we keep adding more dice, the
                data points quickly begins to resemble a normal distribution. There are more combinations of rolls
                that achieve the middle range of values than the outlier ranges.
            </p>
            <DiceChart/>
            <p>
                With SAT scores, the explanation
                may not be as simple as analyzing dice rolls combinations, but there are
                similarities. Perhaps it's because the mean consists of people who have varying talent in test-taking
                and
                spent varying amounts of resources preparing. The number of people who fit that description is far more
                common
                than those at outlier ranges where you have to fit a particular description to score that
                way.
            </p>
            <p>
                So this can change our approach. Getting someone in the 99 percentile compared to the 90 percentile may
                be worth it despite the extra amount of effort it takes.
            </p>

            <h1>A Plan and Review Approach</h1>

            <p>
                The insightful thing about the secretary approach is the stopping rule. By evaluating some number
                of candidates before deciding,
                we get a better understanding of the candidates a particular behavior yields. This is
                especially important when picking a single candidate in an unfamiliar field. This is the "review"
                portion of the chart below.
            </p>
            <p>
                The "planning" portion is more of a fun exercise in my opinion. I put less weight in it since a lot of
                it depends on
                chance. But if you need to be very efficient when dedicating resources to evaluate candidates, it can be
                useful.
            </p>
            <SatChart/>
            <p>
                These simulations make two big assumptions. The sample population follows a distribution that the SAT
                has and that
                we select candidates randomly. The chart can also mislead us
                into believing that a 99 percentile means a 2220 score in general, whereas it just means compared
                to the sampled population. If we sample 50 pancakes at Applebee's, the best one is likely to be around a
                "2220/2400," but it's relative to pancakes made at that particular Applebee's. Relative to world,
                it probably doesn't rank as high.
            </p>
            <p></p>
            <p>
                I think that's pretty neat though. You can get a really good picture of a particular population a
                behavior yields by
                evaluating just a moderate number of candidates. With the pancake example, I'd
                say you can try out 10-20 pancakes at Applebee's before deciding that you're out of your mind trying to
                get good pancakes like this.
            </p>

        </Typography>
    );
}

export default App;
