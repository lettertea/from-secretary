import React from 'react';
import './App.css';
import DiceChart from "./components/DiceChart";
import SatChart from "./components/SatChart";
import Typography from "@material-ui/core/Typography";

function App() {
  return (
    <Typography className="App">
        <Typography variant={"h2"}>The Secretary Problem</Typography>
      <p>The secretary problem is mostly about finding the best candidate in a limited pool if you can only judge one
        candidate at a
        time and can't go back. It uses an optimal stopping
        approach by always rejecting the first X amount of candidates before accepting the next best candidate.</p>
      <p>There
        are several approaches to the stopping strategy. A popular one is the 1/e, or 36.8%, strategy. For example, if
        we have 100 candidates to choose from, we would evaluate then reject the first 37 candidates. It doesn't
        matter how good
        they are. The rule is to always reject them. Then pick the first of the remaining 63 candidates that is better
        than the rest of the 37 rejected.</p>
      <p>
        It's error-prone and restrictive, however. There's a 37% chance the best candidate of the 100
        was within the first 37 rejected. That means we will get to the end of the candidate list without
        choosing anyone since the criteria is to find an even better candidate who doesn't exist. But if we really
        need the best candidate, and have a limited pool, and can't go back, the secretary approach is a really good
        option.</p>
      <p>Let's
        look at a stopping strategy where we have 3 total candidates and reject the first one (1/3, or 33.3%,
        strategy). If the best candidate is the first one we evaluate, we're screwed. If it's the second one, then we
        just reject the first candidate and pick the second one. If it's the third one, there are two cases. The first
        candidate was the worst one, so we end up with the second candidate who is rank 2. The other case is where the
        first candidate is rank 2. We reject the second candidate as it is worse than the first one, so we choose the
        third one. In the end, there's a 3/6 chance of choosing rank 1, 1/6
        chance of choosing rank 2, and 2/6 chance of not choosing a candidate at all.
      </p>
      <p>
        This logic translates quite nicely to larger populations as well. Running simulations that model the secretary
        approach, the rank of
        the best candidate found remains consistently around 1.8 with the 1/e approach.
      </p>
      <img style={{ margin: 0 }} src={require("./candidate_rank.png")} alt="Candidate Rank"/>
      <figcaption>Average candidate rank, excluding failures, of 2500 simulations using the secretary approach
      </figcaption>

      <h1>
        Moving on from the secretary problem
      </h1>
      <p>
        In many scenarios, finding a decently good candidate is sufficient. We also don't want to use so many
        resources rejecting a bunch of candidates just so we can get rank 1. Sure, rank 2 may be a bit worse, but it
        wouldn't be noticeable. But then how about 3? And then 4? When should we stop?
      </p>
      <p>
        The answer is subjective, but analyzing the data points of released SAT scores can help. CollegeBoard
        releases the official SAT data yearly that breakdowns the percentile of how many people scored what in
        increments of 10. I looked into
        the <a
          href="https://web.archive.org/web/20170106113421/https://secure-media.collegeboard.org/digitalServices/pdf/sat/sat-percentile-ranks-composite-crit-reading-math-writing-2015.pdf"
          target="_blank" rel="noopener noreferrer">
        2015 dataset
      </a>, and it more or less follows a normal distribution. Most people tend towards average, so the difference
        between, say, the 30 percentile and the 70 percentile isn't that much considering the large difference in
        percentile. According to the data, it would be 350 points. And when approaching outliers, the difference is
        more significant.
        The difference between the 98.02 percentile and the 99.98 percentile would be 220 points.
      </p>
      <p>
        I struggled to accept this because I've always thought improvement follows the law of diminishing returns.
        I consider it much harder to improve from scoring 2300 to 2400 compared to from 1400 to 1500. Yet just going
        up the percentile slightly at those outlier ranges, the scores jump a lot more. I thought the
        distribution would be like an upside-down parabola, where there the difference is significantly less at the
        outlier ranges. But at this
        point, I wasn't really questioning the
        SAT data but more about why normal distributions exist.
      </p>
      <p>
        If we look at dice rolls, there are just more possible combinations of factors that lead us to the mean. With
        a single die, you will get a uniform distribution of results. With two dice, it will look like a
        triangle because there are more ways to achieve 7 than 2. And when you keep adding more dice, the
        data points quickly begins to resemble a normal distribution.
      </p>
      <DiceChart/>
      <p>
        I still believe the law of diminishing returns apply in the SAT scenario. The explanation
        may not be as simple as analyzing dice rolls combinations, but there are
        similarities. Perhaps it's because the mean consists of people who have varying academic aptitude and spent
        varying amounts of time preparing. The number of people who fit that description is far more common
        than those at outlier ranges where lots of time and talent are necessary. Perhaps the difference is so large
        that the law of diminishing returns appears insignificant in looking at percentile scorers.
      </p>
      <p>
        So this can change our approach. Getting someone in the 99 percentile compared to the 90 percentile may be
        worth it despite the extra amount of effort it takes.
      </p>

      <h1>A Plan and Review Approach</h1>

      <p>
        The insightful thing about the secretary approach is the stopping rule. By evaluating some amount
        of
        candidates before deciding,
        we get a better understanding of the candidates out there and the qualities that make them. This is especially
        important when picking a single candidate in a field that's unfamiliar. The number of rejected candidates and
        our evaluations of them can give us a good idea of what makes up the total pool
      </p>
      <p>
        With the SAT data, we can infer that the difference between slightly below and above average
        candidates isn't that significant. But the opposite is true when talking about outliers, those at the tail of
        a normal distribution. The
        difference in scores at that range is much higher per percentile, so it might be worth it to pursue those
        candidates. The caveat is that they're much fewer in number.
      </p>
      <SatChart/>
      <p>
        Now these graphs just show the theoretical mean. If you evaluate just 20 candidates a bunch of times, the
        mean of the best scoring candidate is in the 95.24 percentile. There is still a possibility that candidate is
        at
        or above the 97.56 percentile (25% chance). And there's a possibility that the best candidate is at or below
        the 83.33 percentile (12.5% chance). It really just depends on your luck.
      </p>

      <p>
        It still didn't
      </p>
    </Typography>
  );
}

export default App;
