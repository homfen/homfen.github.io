var key = ''
    + '-----BEGIN PUBLIC KEY-----'
    + 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDtIxjlyRMXcc58lJmBYRQay/AG'
    + '1h0AepNrwOMnd6JH7uvLxZhigwcWPPnCvFmkfF89fMUvLojTGbeyoChFXAWl1xRC'
    + 'TAJtW503DEDvxW834ZubvWjA74UgqyKS02eZLf1e2Nhh12/O5/35NoKeWhX08sh2'
    + 'wgsaI+8lNz+2+5f5EwIDAQAB'
    + '-----END PUBLIC KEY-----';
$('#submit').on('click', function () {
    var encrypt = new JSEncrypt();
    encrypt.setKey(key);
    var psw = $('input:password').val().trim();
    var usr = $('input:text').val().trim();
    if (psw === '' || usr === '') {
        return false;
    }
    var encrypted = encrypt.encrypt(psw);
    $('input:password').val(encrypted);
});
