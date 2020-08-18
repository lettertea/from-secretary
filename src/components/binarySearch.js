export default (arr, value) => {
    let low = 0
    let high = arr.length
    while (low < high) {
        let mid = Math.floor((low + high) / 2)
        const distance = arr[mid]
        if (arr[mid] < value) {
            low = mid + 1
        } else if (distance > value) {
            high = mid
        }
        return mid
    }
    return low
}