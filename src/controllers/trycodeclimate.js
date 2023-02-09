/* eslint-disable no-unused-vars */

// eslint-disable-next-line consistent-return
function luckysheetbinary_search(arr, key) {
    let low = 0, high = arr.length - 1;
    
    while (low <= high) {
        let mid = parseInt((high + low) / 2);
        
        if (key < arr[mid] && (mid == 0 || key >= arr[mid - 1])) {
            return mid;
        } 
        else if (key >= arr[mid]) {
            low = mid + 1;
        } 
        else if (key < arr[mid]) {
            high = mid - 1;
        }
        else {
            return -1;
        }
    }
}