import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
  Heart,
  Home,
  MessageCircle,
  Plus,
  Search,
  Share2,
  User
} from 'lucide-react-native';
import { useState } from 'react';
import {
  Dimensions, FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput, TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

const posts = [
  {
    id: 1,
    user: "Closet",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    time: "2h",
    content: "My friend 💙 Why you are so quiet what's on your mind ?\nPov:behen ki barat 💖\nCloset's Rawalpindi / Islamabad Studio:... See more",
    image: "https://picsum.photos/id/1015/800/600",
    likes: 1240,
    comments: 89,
  },
];

function HomeScreen() {
  const [likedPosts, setLikedPosts] = useState([]);

  const toggleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Facebook Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.facebookLogo}>facebook</Text>
        <View style={styles.topRightIcons}>
          <TouchableOpacity style={styles.iconBtn}><Plus size={24} color="#000" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Search size={24} color="#000" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><MessageCircle size={24} color="#000" /></TouchableOpacity>
        </View>
      </View>

      {/* Create Post */}
      <View style={styles.createPost}>
        <Image source={{ uri: "https://randomuser.me/api/portraits/women/68.jpg" }} style={styles.profilePic} />
        <TouchableOpacity style={styles.whatsOnMind}>
          <Text style={styles.whatsOnMindText}>What's on your mind?</Text>
        </TouchableOpacity>
      </View>

      {/* Stories Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
        {/* Create Story */}
        <TouchableOpacity style={styles.createStory}>
          <Image source={{ uri: "https://randomuser.me/api/portraits/women/68.jpg" }} style={styles.storyBigImage} />
          <View style={styles.plusCircle}>
            <Plus size={28} color="#1877F2" strokeWidth={3} />
          </View>
          <Text style={styles.storyText}>Create story</Text>
        </TouchableOpacity>

        {/* Sample Stories */}
        <TouchableOpacity style={styles.storyCard}>
          <Image source={{ uri: "https://picsum.photos/id/237/300/300" }} style={styles.storyBigImage} />
          <Text style={styles.storyText}>WordCraft Academy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.storyCard}>
          <Image source={{ uri: "https://picsum.photos/id/64/300/300" }} style={styles.storyBigImage} />
          <Text style={styles.storyText}>Adanna Duru</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Posts */}
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View>
                <Text style={styles.postUser}>{item.user}</Text>
                <Text style={styles.postTime}>{item.time} • 🌍</Text>
              </View>
            </View>

            <Text style={styles.postContent}>{item.content}</Text>
            
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.postImage} />
            )}

            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionBtn} onPress={() => toggleLike(item.id)}>
                <Heart size={24} color={likedPosts.includes(item.id) ? "#e0245e" : "#65676b"} fill={likedPosts.includes(item.id) ? "#e0245e" : "none"} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <MessageCircle size={24} color="#65676b" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Share2 size={24} color="#65676b" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

// ================== ORIGINAL SEARCH SCREEN ==================
function SearchScreen() {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <Text style={styles.screenTitle}>Search</Text>
      </View>
      <View style={styles.searchBar}>
        <Search size={22} color="#1877F2" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Facebook"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <ScrollView>
        <Text style={styles.sectionHeader}>Recent Searches</Text>
        {["Muhammad Bilal", "FAST University", "Swat Valley Trip", "Ali Hassan"].map((item, index) => (
          <View key={index} style={styles.recentItem}>
            <View style={styles.recentAvatar}><Text>👤</Text></View>
            <Text style={styles.recentText}>{item}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ================== ORIGINAL PROFILE SCREEN ==================
function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Cover Photo */}
      <View style={styles.coverPhoto}>
        <Image 
          source={{ uri: "https://picsum.photos/id/1015/800/300" }} 
          style={styles.coverImage} 
        />
        <View style={styles.profilePicContainer}>
          <Image 
            source={{ uri: "https://randomuser.me/api/portraits/women/68.jpg" }} 
            style={styles.profileBig} 
          />
        </View>
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>Aima Khan</Text>
        <Text style={styles.profileBio}>Student | Explorer | Love traveling & photography</Text>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.menuSection}>
        {[
          { label: "Friends" },
          { label: "Reels" },
          { label: "Photos" },
          { label: "Notifications" },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <Text style={styles.menuText}>👥 {item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#1877F2',
          tabBarInactiveTintColor: '#65676b',
          tabBarStyle: { height: 60, paddingBottom: 8 },
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color }) => <Home color={color} size={26} /> }} />
        <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarIcon: ({ color }) => <Search color={color} size={26} /> }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ({ color }) => <User color={color} size={26} /> }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  facebookLogo: { fontSize: 28, fontWeight: '700', color: '#1877F2' },
  topRightIcons: { flexDirection: 'row', gap: 15 },
  iconBtn: { padding: 5 },

  createPost: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profilePic: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  whatsOnMind: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    padding: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  whatsOnMindText: { color: '#65676b', fontSize: 16 },

  storiesContainer: { backgroundColor: 'white', paddingVertical: 10 },
  createStory: {
    width: 110,
    height: 170,
    marginLeft: 12,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  storyCard: {
    width: 110,
    height: 170,
    marginHorizontal: 6,
    borderRadius: 12,
    overflow: 'hidden',
  },
  storyBigImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  plusCircle: {
    position: 'absolute',
    bottom: 45,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 2,
    borderWidth: 3,
    borderColor: '#1877F2',
  },
  storyText: { marginTop: 5, fontSize: 12, fontWeight: '500', color: '#000' },

  postCard: { backgroundColor: 'white', marginVertical: 8, borderRadius: 8, overflow: 'hidden' },
  postHeader: { flexDirection: 'row', padding: 12, alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  postUser: { fontWeight: '600', fontSize: 15 },
  postTime: { color: '#65676b', fontSize: 13 },
  postContent: { paddingHorizontal: 12, paddingBottom: 10, fontSize: 15, lineHeight: 22 },
  postImage: { width: '100%', height: 420, resizeMode: 'cover' },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionBtn: { padding: 8 },

  // Search Screen Styles
  searchHeader: { padding: 15, backgroundColor: 'white' },
  screenTitle: { fontSize: 24, fontWeight: 'bold' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 12,
    padding: 12,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  sectionHeader: { fontSize: 18, fontWeight: '600', padding: 15, color: '#1877F2' },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    marginHorizontal: 12,
    marginVertical: 4,
    borderRadius: 8,
  },
  recentAvatar: { width: 45, height: 45, backgroundColor: '#e4e6ea', borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  recentText: { fontSize: 16 },

  // Profile Screen Styles
  coverPhoto: { height: 220, position: 'relative' },
  coverImage: { width: '100%', height: '100%' },
  profilePicContainer: { position: 'absolute', bottom: -40, left: 15, borderWidth: 4, borderColor: 'white', borderRadius: 50 },
  profileBig: { width: 100, height: 100, borderRadius: 50 },
  profileInfo: { alignItems: 'center', marginTop: 45 },
  profileName: { fontSize: 24, fontWeight: 'bold' },
  profileBio: { color: '#65676b', marginTop: 4, textAlign: 'center', paddingHorizontal: 20 },
  editButton: { backgroundColor: '#1877F2', margin: 15, padding: 12, borderRadius: 8, alignItems: 'center' },
  editButtonText: { color: 'white', fontWeight: '600', fontSize: 16 },
  menuSection: { marginTop: 10 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: 'white', marginHorizontal: 12, marginVertical: 4, borderRadius: 8 },
  menuText: { marginLeft: 15, fontSize: 16, fontWeight: '500' },
});