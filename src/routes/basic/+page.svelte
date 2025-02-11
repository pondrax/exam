<script lang="ts">
	import { onMount } from 'svelte';
	import io, { Socket } from 'socket.io-client';
	import { PUBLIC_SOCKET_URL } from '$env/static/public';

	let localVideo: HTMLVideoElement;
	let remoteVideo: HTMLVideoElement;
	let startBtn: HTMLButtonElement;
	let localStream = $state() as MediaStream;
	let peerConnection: RTCPeerConnection | null = null;
	const roomId: string = 'room1'; // Example room ID
	const socket: Socket = io(PUBLIC_SOCKET_URL); // Connect to the Socket.IO server

	// Join room and set up local media stream on component mount
	onMount(async () => {
		socket.emit('join-room', roomId);

		// Get local video stream
		try {
			localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
			if (localStream) {
				localVideo.srcObject = localStream;
			}
		} catch (err) {
			console.error('Error accessing media devices.', err);
		}

		// Create peer connection if localStream is available
		if (localStream) {
			peerConnection = new RTCPeerConnection();
			localStream.getTracks().forEach((track) => peerConnection?.addTrack(track, localStream));

			// Handle ICE candidates
			peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
				if (event.candidate) {
					socket.emit('ice-candidate', event.candidate, roomId);
				}
			};

			// Handle remote stream
			peerConnection.ontrack = (event: RTCTrackEvent) => {
				remoteVideo.srcObject = event.streams[0];
			};
		}
	});

	// Start chat (create offer)
	const startChat = async (): Promise<void> => {
		if (!peerConnection) return;

		startBtn.disabled = true;

		// Create an offer and send it to the other peer
		try {
			const offer = await peerConnection.createOffer();
			await peerConnection.setLocalDescription(offer);
			socket.emit('offer', offer, roomId);
		} catch (err) {
			console.error('Error creating offer:', err);
		}
	};

	// Handle incoming offer and send an answer
	socket.on('offer', async (offer: RTCSessionDescriptionInit) => {
		if (!peerConnection) return;

		try {
			await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
			const answer = await peerConnection.createAnswer();
			await peerConnection.setLocalDescription(answer);
			socket.emit('answer', answer, roomId);
		} catch (err) {
			console.error('Error handling offer:', err);
		}
	});

	// Handle incoming answer
	socket.on('answer', (answer: RTCSessionDescriptionInit) => {
		if (!peerConnection) return;
		peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
	});

	// Handle incoming ICE candidates
	socket.on('ice-candidate', (candidate: RTCIceCandidate) => {
		if (!peerConnection) return;
		peerConnection.addIceCandidate(candidate);
	});
</script>

<main>
	<h1>Simple Video Chat</h1>
	<div id="videos">
		Local
		<video bind:this={localVideo} autoplay muted></video>
		Remote
		<!-- svelte-ignore a11y_media_has_caption -->
		<video bind:this={remoteVideo} autoplay></video>
	</div>
	<button bind:this={startBtn} onclick={startChat} class="btn btn-primary">Start Video Chat</button>
</main>
