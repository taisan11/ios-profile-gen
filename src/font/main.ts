const submitButton = document.getElementById('create') as HTMLButtonElement | null;
if (submitButton) {
    submitButton.addEventListener('click', async () => {
        const fontfile = document.getElementById('fontfile') as HTMLInputElement | null;
        const file = fontfile!.files![0];
        const fontfilebase64 = btoa(String.fromCharCode(...new Uint8Array(await file.arrayBuffer())));
        const fontNameInput = document.getElementById('fontname') as HTMLInputElement | null;
        const setNameInput = document.getElementById('setname') as HTMLInputElement | null;
        const fontName = fontNameInput ? fontNameInput.value : 'Font.ttf';
        const setName = setNameInput ? setNameInput.value : 'Fonts';
        const payload = `<?xml version=”1.0” encoding=”UTF-8”?>
<!DOCTYPE plist PUBLIC “-//Apple//DTD PLIST 1.0//EN” “http://www.apple.com/DTDs/PropertyList-1.0.dtd”>
<plist version=”1.0”>
<dict>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>Font</key>
            <data>${fontfilebase64}</data>
            <key>Name</key>
            <string>${fontName}</string>
            <key>PayloadIdentifier</key>
            <string>dev.pages.ios-profile-gen.fontpayload.${fontName}</string>
            <key>PayloadType</key>
            <string>com.apple.font</string>
            <key>PayloadUUID</key>
            <string>${crypto.randomUUID()}</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
        </dict>
    </array>
    <key>PayloadDisplayName</key>
    <string>${setName}</string>
    <key>PayloadIdentifier</key>
    ${/* PayloadIdentifier must be unique */ ''}
    <string>dev.pages.ios-profile-gen.fontprofile.${fontName}</string>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>${crypto.randomUUID()}</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
</dict>
</plist>`;
    const a = document.createElement('a');
    a.innerText = 'Download';
    a.download = `${setName}.mobileconfig`;
    a.href = `data:application/x-apple-aspen-config;base64,${btoa(payload)}`;
    document.body.appendChild(a);
    })
}