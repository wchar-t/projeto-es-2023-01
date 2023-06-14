// use in server, as we need to se some headers

const ops = {
  PersonalSections: {
    operationName: 'PersonalSections',
    variables: {
      input: {
        sectionInputs: [
          'RECOMMENDED_SECTION',
        ],
        recommendationContext: {},
      },
      creatorAnniversariesFeature: false,
    },
    extensions: {
      persistedQuery: {
        version: 1,
        sha256Hash: '807e3cce07a1cef5c772bbc46c12ead2898edd043ad4dd2236707f6f7995769c',
      },
    },
  },
  PlaybackAccessToken_Template: {
    operationName: 'PlaybackAccessToken_Template',
    // query directly instead of persistedQuery? hm
    query: 'query PlaybackAccessToken_Template($login: String!, $isLive: Boolean!, $vodID: ID!, $isVod: Boolean!, $playerType: String!) {  streamPlaybackAccessToken(channelName: $login, params: {platform: "web", playerBackend: "mediaplayer", playerType: $playerType}) @include(if: $isLive) {    value    signature    __typename  }  videoPlaybackAccessToken(id: $vodID, params: {platform: "web", playerBackend: "mediaplayer", playerType: $playerType}) @include(if: $isVod) {    value    signature    __typename  }}',
    variables: {
      isLive: true,
      login: 'loud_coringa',
      isVod: false,
      vodID: '',
      playerType: 'site',
    },
  },
};

type names = keyof typeof ops;

export default class Twitch {
  private static clientId = 'kimne78kx3ncx6brgo4mv6wki5h1ko';
  private static clientSessionId = '33bf55027afd5554';
  private static clientVersion = '3e62b6e7-8e71-47f1-a2b3-0d661abad039';
  private static xDeviceId = 'iuqNdxlCZf8hWPY4WiOfxyhu9m4pKZAz';
  private static UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';

  private static headers = {
    'Client-Id': this.clientId,
    'Client-Session-Id': this.clientSessionId,
    'Client-Version': this.clientVersion,
    'X-Device-Id': this.xDeviceId,
    'User-Agent': this.UA,
  };

  public static fetch({
    operations,
    operationsModded,
  }: {
    operations?: names[],
    operationsModded?: object[],
  }) {
    return fetch('https://gql.twitch.tv/gql', {
      method: 'POST',
      headers: this.headers,
      body: operations
        ? JSON.stringify(operations.map((op) => ops[op]))
        : JSON.stringify(operationsModded),
    }).then((e) => e.json());
  }

  public static getStream(username: string) {
    const template = ops.PlaybackAccessToken_Template;
    template.variables.login = username;
    return this.fetch({ operationsModded: [template] }).then((e) => e[0].data);
  }
}
