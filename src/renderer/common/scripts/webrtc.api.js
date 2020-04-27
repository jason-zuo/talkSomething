/**
 *@Description
 * webrtc api
 */

let PeerConnection =
    window.PeerConnection ||
    window.webkitPeerConnection ||
    window.webkitRTCPeerConnection ||
    window.mozRTCPeerConnection,

    URL =
        window.URL ||
        window.webkitURL ||
        window.msURL ||
        window.oURL,

    getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia ||
        navigator.mediaDevices.getUserMedia,

    nativeRTCIceCandidate =
        window.mozRTCIceCandidate ||
        window.RTCIceCandidate,

    nativeRTCSessionDescription =
        window.mozRTCSessionDescription ||
        window.RTCSessionDescription;

class funnyWebrtc {
    constructor() {

    }

    start = () => {

    }


}

export default funnyWebrtc
