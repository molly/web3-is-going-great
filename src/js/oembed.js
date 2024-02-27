export const getOembedHeaders = (id) => (
  <>
    <link
      rel="alternate"
      type="application/json+oembed"
      href={`https://www.web3isgoinggreat.com/api/oembed?url=https://www.web3isgoinggreat.com/?id=${id}&format=json`}
    />
    <link
      rel="alternate"
      type="application/xml+oembed"
      href={`https://www.web3isgoinggreat.com/api/oembed?url=https://www.web3isgoinggreat.com/?id=${id}&format=xml`}
    />
  </>
);
