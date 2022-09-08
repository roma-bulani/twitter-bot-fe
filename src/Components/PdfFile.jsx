import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link
} from '@react-pdf/renderer';
import { Fragment } from 'react';
export const PdfFile = ({ allTweets, threadId, username }) => {
  const styles = StyleSheet.create({
    document: {
      backgroundColor: '#E4E4E4'
    },
    page: {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 600,
      margin: 16,
      position: 'relative'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },

    image: {
      width: 600,
      height: 400,
      marginHorizontal: 'auto',
      marginVertical: 10,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    },
    videoimage: {
      width: 600,
      height: 400,
      marginHorizontal: 'auto',
      marginVertical: 10,
      zIndex: -1,
      top: '0'
    },
    tweet: {
      margin: 10
    },
    playButton: {
      position: 'absolute',
      top: 30,
      zIndex: 20,
      width: 20,
      right: 20
    },
    footer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 20,
      right: 50,
      fontSize: 12,
      color: '#000',
      textDecoration: 'none'
    },
    footerName: {
      flexDirection: 'column'
    },
    avatar: {
      width: 30,
      height: 30,
      borderRadius: '50%',
      marginRight: 5
    }
  });
  return (
    <Document style={styles.document}>
      {allTweets?.map((tweet) => (
        <Page orientation="landscape" style={styles.page} key={tweet.id}>
          <View style={styles.tweet}>
            <Text>{tweet.text}</Text>
            <View style={styles.imageContainer}>
              {tweet.media.length > 0 &&
                tweet.media.map((mediaObj) => (
                  <Fragment key={mediaObj.url}>
                    {mediaObj.type === 'photo' ? (
                      <Image src={mediaObj.url} style={styles.image} />
                    ) : (
                      <Link
                        src={`https://twitter.com/${username}/status/${tweet.id}`}
                      >
                        <Image
                          src={mediaObj.url}
                          style={styles.videoimage}
                          source={mediaObj.preview_image_url}
                        />
                      </Link>
                    )}
                  </Fragment>
                ))}
            </View>
          </View>
          <Link
            style={styles.footer}
            src={`https://twitter.com/${username}/status/${threadId}`}
          >
            <Image src={allTweets[0].profile_url} style={styles.avatar}></Image>
            <View style={styles.footerName}>
              <Text>{allTweets[0].name}</Text>
              <Text>{`@${allTweets[0].username}`}</Text>
            </View>
          </Link>
        </Page>
      ))}
    </Document>
  );
};
