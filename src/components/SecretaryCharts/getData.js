const TOTAL_POOL = "Total Pool (N)"
const REJECT_THRESHOLD = "Reject First N candidate(s)"
const SUCCESS_RATE = "Success Rate (%)"
const CANDIDATE_PERCENTILE = "Average Percentile (%)"
const CANDIDATE_LOCATION = "Candidate Location"
const CANDIDATE_RANK = "Selected Candidate Rank"

const SIMULATIONS = 250

export {SIMULATIONS}
export const DEPENDENT_VARIABLES = [CANDIDATE_RANK, CANDIDATE_LOCATION, SUCCESS_RATE]

const EULER_STRATEGY = "1/e"
const QUARTER_STRATEGY = "0.25"
const ROOT_STRATEGY = "sqrt(N)"

const STRATEGIES = [EULER_STRATEGY, QUARTER_STRATEGY, ROOT_STRATEGY]
export {STRATEGIES}

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
                "candidateRank": candidatePercentiles.indexOf(candidatePercentile) + 1 // iterative approach is actually faster as ranks tend to be close to 1
            }
        }
    }
    return false;

}

export const computeSecretarySimulations = (N) => {
    const results = {}

    let candidateRankCounter = 0
    let candidateLocationCounter = 0
    let candidatePercentileCounter = 0

    for (let strategy of STRATEGIES) {
        let successfulSimulations = 0;

        const stoppingThreshold = {
            [EULER_STRATEGY]: N * (1 / Math.E),
            [QUARTER_STRATEGY]: N * .25,
            [ROOT_STRATEGY]: Math.sqrt(N)
        }[strategy]

        for (let _ = 0; _ < SIMULATIONS; _++) {
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

        results[TOTAL_POOL] = {...results[TOTAL_POOL], [strategy]: N}
        results[REJECT_THRESHOLD] = {...results[REJECT_THRESHOLD], [strategy]: stoppingThreshold}
        results[SUCCESS_RATE] = {...results[SUCCESS_RATE], [strategy]: 100 * successfulSimulations / SIMULATIONS}
        results[CANDIDATE_PERCENTILE] = {
            ...results[CANDIDATE_PERCENTILE],
            [strategy]: candidatePercentileCounter / successfulSimulations
        }
        results[CANDIDATE_LOCATION] = {
            ...results[CANDIDATE_LOCATION],
            [strategy]: candidateLocationCounter / successfulSimulations
        }
        results[CANDIDATE_RANK] = {...results[CANDIDATE_RANK], [strategy]: candidateRankCounter / successfulSimulations}
    }
    return results
}

