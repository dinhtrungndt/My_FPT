import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Switch,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useContext, useRef} from 'react';
import {DataTile} from './Data';
import {UserContext} from '../../user/UserContext';
import {getDienDan} from '../homeService';
import {ThemeContext} from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';

const DienDanScreens = props => {
  const {navigation} = props;

  const [showFullContent, setShowFullContent] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [dienDan, setDienDan] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useContext(ThemeContext);
  const {user, setUser} = useContext(UserContext);

  const dropdownRef = useRef(); // Thêm useRef vào để tham chiếu đến dropdown

  const onGetDienDan = async () => {
    setLoading(true);
    const res = await getDienDan();
    setDienDan(res);
    setLoading(false);
  };

  useEffect(() => {
    onGetDienDan();
  }, []);

  const menuOptions = [
    'Thông tin cá nhân',
    'Khen thưởng/Kỷ luật',
    'Cài đặt',
    'logOut',
  ];

  const menuIcons = [
    require('../../../../media/img/account_25px.png'),
    require('../../../../media/img/love_25px.png'),
    require('../../../../media/img/settings_25px.png'),
    require('../../../../media/img/export_25px.png'),
  ];

  const renderMenuRow = (rowData, rowID, highlighted) => {
    const icon = menuIcons[rowID];

    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: '#FF8E3C',
        }}
        onPress={() => handleMenuItemPress(rowData)}>
        <Image
          style={{
            width: 20,
            height: 20,
            marginTop: 10,
          }}
          source={icon}
        />
        {/* Bọc nội dung văn bản trong thành phần <Text> */}
        <Text style={{padding: 10, color: '#000'}}>{rowData}</Text>
      </TouchableOpacity>
    );
  };

  const handleMenuItemPress = rowData => {
    if (rowData === 'Thông tin cá nhân') {
      // Model hiển thị thông tin cá nhân
      navigation.navigate('EditScreens');
    }
    if (rowData === 'Khen thưởng/Kỷ luật') {
      handleSupportClick();
    }
    if (rowData === 'logOut') {
      handleLogout();
    } else {
      console.log(rowData);
    }

    // Đóng dropdown sau khi chọn lựa chọn
    dropdownRef.current.hide();
  };

  // Cắt nội dung
  const cutContent = (text, maxLength) => {
    if (showFullContent || text.length <= maxLength) {
      return (
        <Text style={{fontSize: 20, color: '#000', textAlign: 'left'}}>
          {text}
        </Text>
      );
    }

    const truncatedText = text.substring(0, maxLength - 3);
    return (
      <View>
        <Text style={{fontSize: 20, color: '#000', textAlign: 'left'}}>
          {truncatedText}
        </Text>
        <TouchableOpacity onPress={() => setShowFullContent(true)}>
          <Text
            style={{
              fontSize: 20,
              color: '#007CFF',
              textAlign: 'left',
              paddingTop: 10,
            }}>
            Xem thêm...
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHideButton = () => {
    if (showFullContent) {
      return (
        <TouchableOpacity onPress={() => setShowFullContent(false)}>
          <Text
            style={{
              fontSize: 20,
              color: '#007CFF',
              textAlign: 'left',
              paddingLeft: 50,
            }}>
            Ẩn
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const handleLikePress = async () => {
    try {
      if (isLiked) {
        // Gọi API để giảm số lượng like
        await fetch(`http://your-api-url/unlike/${postId}`, {method: 'POST'});
      } else {
        // Gọi API để tăng số lượng like
        await fetch(`http://your-api-url/like/${postId}`, {method: 'POST'});
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Lỗi khi xử lý like: ', error);
    }
  };

  // Hàm xử lý sự kiện khi người dùng nhập bình luận
  const handleCommentSubmit = () => {
    if (commentText.trim() !== '') {
      setComments([...comments, commentText]);
      setCommentText('');
    }
  };

  // Hàm hiển thị các bình luận
  const renderComments = () => {
    return (
      <FlatList
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <Image
              style={{width: 30, height: 30, borderRadius: 15, marginRight: 10}}
              source={item.avatar} // Thay 'item.avatar' bằng nguồn hình ảnh avatar của người đăng bình luận
            />
            <Text style={{fontSize: 15, color: '#000'}}>{item.comment}</Text>
          </View>
        )}
      />
    );
  };

  const handleSharePress = () => {
    Alert.alert('Chia sẻ thành công !');
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <View>
      {loading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            paddingTop: 50,
          }}>
          <Image
            style={{width: 100, paddingLeft: 80}}
            source={require('../../../../media/img/loading_ly.gif')}
          />
        </View>
      ) : (
        <View style={styles.T}>
          {/* header */}
          <View style={styles.header}>
            {/* Tài khoản */}
            <Image
              style={{
                backgroundColor: '#fff',
                width: 50,
                height: 50,
                borderRadius: 50 / 2,
                marginLeft: -10,
              }}
              source={{uri: user.user.img}}
            />
            <View>
              {/* Hello bee */}
              <Text
                style={[
                  {
                    height: 20,
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginLeft: 10,
                  },
                  {color: theme.color},
                ]}>
                Hello bee ✋
              </Text>
              {/* name user */}
              <Text
                style={[
                  {
                    height: 20,
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginLeft: 10,
                    marginTop: 5,
                    color: '#000',
                  },
                  {color: theme.color},
                ]}>
                {user.user.name}
              </Text>
            </View>

            {/* Điểm danh */}
            <TouchableOpacity
              onPress={() => navigation.navigate('DiemDanhScreens')}>
              <Image
                style={{top: 15, marginLeft: 65}}
                source={require('../../../../media/img/attendance.png')}
              />
            </TouchableOpacity>
            {/* Thông báo */}
            <TouchableOpacity
              onPress={() => navigation.navigate('ThongBaoScreens')}>
              <Image
                style={{top: 15, marginLeft: 10}}
                source={require('../../../../media/img/notification.png')}
              />
            </TouchableOpacity>
            {/* 3 chấm */}
            <View style={{marginLeft: 10}}>
              <ModalDropdown
                options={menuOptions}
                renderRow={renderMenuRow}
                defaultIndex={0}
                dropdownStyle={{
                  width: 180,
                  height: 220,
                  marginTop: 10,
                  borderWidth: 1,
                  borderColor: '#FF8E3C',
                  padding: 10,
                }}>
                <Image
                  style={{top: 15}}
                  source={require('../../../../media/img/menu_logout.png')}
                />
              </ModalDropdown>
            </View>
          </View>
          {/* gạch ngang */}
          <Text
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#A2A2A2',
              marginTop: 50,
            }}></Text>

          {/* Search */}
          <TouchableOpacity
            style={styles.search}
            onPress={() => navigation.navigate('SearchScreens')}>
            <Image
              style={{width: 20, height: 20, marginLeft: 15, marginTop: 12}}
              source={require('../../../../media/img/search.png')}
            />
            <Text
              style={{
                paddingHorizontal: 10,
                width: '85%',
                fontSize: 16,
                paddingTop: 9,
                paddingLeft: 10,
              }}>
              Tìm kiếm...
            </Text>
          </TouchableOpacity>

          {/* body */}
          <View style={styles.body}>
            <FlatList
              data={DataTile}
              style={{height: 540}}
              refreshing={loading}
              onRefresh={onGetDienDan}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50 / 2,
                      }}
                      source={item.avatar}
                    />
                    <View
                      style={{
                        marginLeft: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '500',
                          color: '#000',
                        }}>
                        {item.name}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <Text>{item.date}</Text>
                        <Image
                          style={{width: 20, height: 20, marginLeft: 7}}
                          source={item.website}
                        />
                      </View>
                    </View>
                    <TouchableOpacity>
                      <Image
                        style={{marginLeft: 50}}
                        source={require('../../../../media/img/menu_vertical_25px.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{marginTop: 20}}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#000',
                        textAlign: 'left',
                      }}>
                      {cutContent(item.title, 150)}
                      {renderHideButton()}
                    </Text>
                  </View>
                  <Image
                    source={item.image}
                    style={{width: 370, height: 580, marginTop: 20}}
                  />
                  <View style={{flexDirection: 'row', margin: 15}}>
                    <Image
                      style={{width: 23, height: 23}}
                      source={require('../../../../media/img/good_quality_30px.png')}
                    />
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#000',
                        textAlign: 'left',
                        paddingLeft: 8,
                      }}>
                      {item.like}
                    </Text>
                  </View>
                  <Text
                    style={{
                      borderTopWidth: 1,
                      borderColor: '#B4B4B4',
                      marginTop: -5,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: -10,
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() => setIsLiked(!isLiked)}
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        style={{width: 23, height: 23}}
                        source={
                          isLiked
                            ? require('../../../../media/img/facebook_like_30px_click.png')
                            : require('../../../../media/img/facebook_like_30px.png')
                        }
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: isLiked ? 'bold' : '400',
                          color: isLiked ? '#2A84E3' : '#797979',
                          paddingLeft: 8,
                        }}>
                        Thích
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{flexDirection: 'row', margin: 15, left: 10}}>
                      <Image
                        style={{width: 23, height: 23}}
                        source={require('../../../../media/img/comments_30px.png')}
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#797979',
                          textAlign: 'left',
                          paddingLeft: 8,
                        }}>
                        Bình luận
                      </Text>
                    </TouchableOpacity>
                    {renderComments()}
                    <TouchableOpacity
                      style={{flexDirection: 'row', margin: 15}}
                      onPress={handleSharePress}>
                      <Image
                        style={{width: 23, height: 23}}
                        source={require('../../../../media/img/forward_arrow_30px.png')}
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: '#797979',
                          paddingLeft: 8,
                        }}>
                        Chia sẻ
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={{
                      borderTopWidth: 1,
                      borderColor: '#B4B4B4',
                      marginTop: 10,
                    }}
                  />
                </View>
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default DienDanScreens;

const styles = StyleSheet.create({
  // body
  search: {
    flexDirection: 'row',
    height: 45,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF8E3C',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
  },

  // header
  header: {
    flexDirection: 'row',
    height: 10,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
  },
  T: {
    width: '100%',
    height: '100%',
    padding: 16,
  },
});
