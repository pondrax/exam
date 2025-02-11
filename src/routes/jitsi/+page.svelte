<script lang="ts">
	import { onMount } from 'svelte';
	import JitsiMeetJS from 'lib-jitsi-meet-dist';

	let connection: any;
	let room: any;
	let localTrack: any;

	const domain = 'your-jitsi-domain.com'; // Change this to your self-hosted Jitsi domain
	const roomName = 'test-room';
	const options = {
		hosts: {
			domain,
			muc: `conference.${domain}`
		},
		bosh: `https://${domain}/http-bind`, // Change if using WebSocket
		clientNode: 'http://jitsi.org/jitsimeet'
	};

	onMount(async () => {
		JitsiMeetJS.init();

		connection = new JitsiMeetJS.JitsiConnection(null, null, options);
		connection.addEventListener(
			JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
			onConnectionSuccess
		);
		connection.connect();
	});

	function onConnectionSuccess() {
		room = connection.initJitsiConference(roomName, {});
		room.on(JitsiMeetJS.events.conference.TRACK_ADDED, (track) => {
			if (!track.isLocal()) {
				track.attach(document.getElementById('remote-video'));
			}
		});
		room.join();

		JitsiMeetJS.createLocalTracks({ devices: ['video'] })
			.then((tracks) => {
				localTrack = tracks[0];
				localTrack.attach(document.getElementById('local-video'));
				room.addTrack(localTrack);
			})
			.catch(console.error);
	}
</script>

<div>
	<h2>Local Video</h2>
	<video id="local-video" autoplay playsinline></video>

	<h2>Remote Video</h2>
	<video id="remote-video" autoplay playsinline></video>
</div>
