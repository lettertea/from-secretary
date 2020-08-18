import binarySearch from "../binarySearch";

const TOTAL_POOL = "Total Pool (N)"
const REJECT_THRESHOLD = "Reject First N candidate(s)"
const SUCCESS_RATE = "Success Rate (%)"
const CANDIDATE_PERCENTILE = "Average Percentile (%)"
const CANDIDATE_LOCATION = "When Candidate is Found"
const CANDIDATE_RANK = "Selected Candidate Rank"

const INDEPENDENT_VARIABLES = [TOTAL_POOL, REJECT_THRESHOLD, CANDIDATE_LOCATION]
const DEPENDENT_VARIABLES = [TOTAL_POOL, REJECT_THRESHOLD, CANDIDATE_LOCATION]

export const independentVariables = [...INDEPENDENT_VARIABLES]

const EULER_STRATEGY = "1/e"
const QUARTER_STRATEGY = "0.25"
const ROOT_STRATEGY = "sqrt(N)"

const STRATEGIES = [EULER_STRATEGY, QUARTER_STRATEGY, ROOT_STRATEGY]
export const strategies = [...STRATEGIES];

const simulateSecretary = (N, stopping_threshold) => {
    const candidatePercentiles = Array(N).fill().map(() => Math.random() * 100)
    let bestScore = 0;
    for (let i = 0; i < candidatePercentiles.length; i++) {
        const candidateLocation = i + 1;
        const candidatePercentile = candidatePercentiles[i];
        if (candidateLocation <= stopping_threshold && candidatePercentiles[i] > bestScore) {
            bestScore = candidatePercentile
        } else if (candidateLocation > stopping_threshold && candidatePercentile > bestScore) {
            candidatePercentiles.sort((a, b) => b - a)
            return {
                candidateLocation,
                candidatePercentile,
                "candidateRank": binarySearch(candidatePercentiles, candidatePercentile) + 1
            }
        }
    }
    return false;

}

const getSecretaryParameters = (strategy, xAxis, num) => {
    if (xAxis === REJECT_THRESHOLD) {
        return [num, Math.round({
            [EULER_STRATEGY]: num * Math.E,
            [QUARTER_STRATEGY]: num * 4,
            [ROOT_STRATEGY]: num * num
        }[strategy])]
    }
    if (xAxis === CANDIDATE_LOCATION) {
        num = Math.round({
            [EULER_STRATEGY]: num * Math.E,
            [QUARTER_STRATEGY]: num ** 1.37,
            [ROOT_STRATEGY]: num ** 1.65
        }[strategy])
    }
    return [num, {
        [EULER_STRATEGY]: num * (1 / Math.E),
        [QUARTER_STRATEGY]: num * .25,
        [ROOT_STRATEGY]: Math.sqrt(num)
    }[strategy]]
}

export const computeSecretarySimulations = (independentVariable, N = 16) => {
    const results = {}
    const simulations = 250

    let successfulSimulations = 0;
    let candidateRankCounter = 0
    let candidateLocationCounter = 0
    let candidatePercentileCounter = 0

    for (let strategy of STRATEGIES) {
        const [totalPool, stoppingThreshold] = getSecretaryParameters(strategy, independentVariable, N)

        for (let _ = 0; _ < simulations; _++) {
            const secretaryResult = simulateSecretary(N, stoppingThreshold)

            if (secretaryResult !== false) {
                ++successfulSimulations

                candidateRankCounter += secretaryResult["candidateRank"]
                candidateLocationCounter += secretaryResult["candidateLocation"]
                candidatePercentileCounter += secretaryResult["candidatePercentile"]
            }
        }

        // 0 gives an error due to division by 0. This mainly happens when there are too few simulations.
        if (successfulSimulations === 0) {
            successfulSimulations = 1
        }

        results[TOTAL_POOL] = {...results[TOTAL_POOL], [strategy]: totalPool}
        results[REJECT_THRESHOLD] = {...results[REJECT_THRESHOLD], [strategy]: stoppingThreshold}
        results[SUCCESS_RATE] = {...results[SUCCESS_RATE], [strategy]: 100 * successfulSimulations / simulations}
        results[CANDIDATE_PERCENTILE] = {...results[CANDIDATE_PERCENTILE], [strategy]: candidatePercentileCounter / successfulSimulations}
        results[CANDIDATE_LOCATION] = {...results[CANDIDATE_LOCATION], [strategy]: candidateLocationCounter / successfulSimulations}
        results[CANDIDATE_RANK] = {...results[CANDIDATE_RANK], [strategy]: candidateRankCounter / successfulSimulations}
    }
    return results
}
