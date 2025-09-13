import { Feather } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface User {
  name: string;
  handle: string;
  avatar: string;
}

interface Post {
  id: string;
  text: string;
  date: string;
  comments: number;
  retweets: number;
  likes: number;
}

interface PostCardProps {
  post: Post;
  user: User;
}

const styles = StyleSheet.create({
  postItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#38444d',
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postContent: {
    flex: 1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  postName: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 5,
  },
  postHandle: {
    color: '#8899a6',
    fontSize: 13,
  },
  postText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 22,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '60%',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: '#8899a6',
    fontSize: 13,
    marginLeft: 5,
  },
});

const PostCard = ({ post, user }: PostCardProps) => (
  <View style={styles.postItem}>
    <Image source={{ uri: user.avatar }} style={styles.postAvatar} />
    <View style={styles.postContent}>
      <View style={styles.postHeader}>
        <Text style={styles.postName}>{user.name}</Text>
        <Text style={styles.postHandle}>
          {user.handle} • {post.date}
        </Text>
      </View>
      <Text style={styles.postText}>{post.text}</Text>
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="message-circle" size={16} color="#8899a6" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="repeat" size={16} color="#8899a6" />
          <Text style={styles.actionText}>{post.retweets}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="heart" size={16} color="#8899a6" />
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default PostCard;