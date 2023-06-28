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
  Shelves: {
    operationName: 'Shelves',
    variables: {
      context: { },
      limit: 4,
      requestID: '',
      platform: 'web',
      verbose: false,
      itemsPerRow: 10,
    },
    extensions: {
      persistedQuery: {
        version: 1,
        sha256Hash: 'b6f0c72c747457b73107f6aa00bd6a5bb294539d2de5398646e949c863662543',
      },
    },
  },
  StreamTagsTrackingChannel: {
    operationName: 'StreamTagsTrackingChannel',
    variables: {
      channel: 'loud_coringa',
    },
    extensions: {
      persistedQuery: {
        version: 1,
        sha256Hash: '6aa3851aaaf88c320d514eb173563d430b28ed70fdaaf7eeef6ed4b812f48608',
      },
    },
  },
  ChannelShell: {
    operationName: 'ChannelShell',
    variables: {
      login: 'loud_coringa',
    },
    extensions: {
      persistedQuery: {
        version: 1,
        sha256Hash: '580ab410bcd0c1ad194224957ae2241e5d252b2c5173d8e0cce9d32d5bb14efe',
      },
    },
  },
  NielsenContentMetadata: {
    operationName: 'NielsenContentMetadata',
    variables: {
      collectionID: '',
      isCollectionContent: false,
      isLiveContent: true,
      isVODContent: false,
      login: 'loud_coringa',
      vodID: '',
    },
    extensions: {
      persistedQuery: {
        version: 1,
        sha256Hash: '2dbf505ee929438369e68e72319d1106bb3c142e295332fac157c90638968586',
      },
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
    'Accept-Language': 'pt-BR',
  };

  public static async fetch({
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

  public static async getStream(username: string) {
    const template = ops.PlaybackAccessToken_Template;
    template.variables.login = username;
    return this.fetch({ operationsModded: [template] }).then((e) => (e.error ? e : e[0].data));
  }

  public static async getShelves(limit = 4) {
    const template = ops.Shelves;
    template.variables.limit = limit;
    return this.fetch({ operationsModded: [template] }).then((e) => (e.error ? e : e[0].data));
  }

  public static getStreamTagsTrackingChannel(username: string) {
    const template = ops.StreamTagsTrackingChannel;
    template.variables.channel = username;
    return this.fetch({ operationsModded: [template] }).then((e) => (e.error ? e : e[0].data));
  }

  public static getChannelShell(username: string) {
    const template = ops.ChannelShell;
    template.variables.login = username;
    return this.fetch({ operationsModded: [template] }).then((e) => (e.error ? e : e[0].data));
  }

  public static getNielsenContentMetadata(username: string) {
    const template = ops.NielsenContentMetadata;
    template.variables.login = username;
    return this.fetch({ operationsModded: [template] }).then((e) => (e.error ? e : e[0].data));
  }
}
