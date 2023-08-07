import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import React, {useState, useEffect, useContext, useRef} from 'react';

import themContext from '../../../../../theme/themeContext';
import ModalDropdown from 'react-native-modal-dropdown';

import {getNews} from '../../homeService';
import {getNoiBat} from '../../homeService';

const SearchScreens = props => {
  const {navigation} = props;
  const [darkMode, setDarkMode] = useState(false);
  const theme = useContext(themContext);

  const [news, setNews] = useState([]);
  const [noiBat, setNoiBat] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(); // Thêm useRef vào để tham chiếu đến dropdown

  const menuOptions = [
    'Thông tin cá nhân',
    'Khen thưởng/Kỷ luật',
    'Cài đặt',
    'logOut',
    <Switch
      value={darkMode}
      onValueChange={value => {
        setDarkMode(value);
        setDarkMode(value);
        EventRegister.emit('changeTheme', value);
      }}
    />,
  ];

  const menuIcons = [
    require('../../../../../media/img/account_25px.png'),
    require('../../../../../media/img/love_25px.png'),
    require('../../../../../media/img/settings_25px.png'),
    require('../../../../../media/img/export_25px.png'),
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
      navigation.navigate('AccountScreens');
    }
    if (rowData === 'logOut') {
      handleLogout();
    } else {
      console.log(rowData);
    }

    // Đóng dropdown sau khi chọn lựa chọn
    dropdownRef.current.hide();
  };

  const [searchText, setSearchText] = useState('');

  const filterNews = (newsList, noiBatList, query) => {
    if (!query) {
      return newsList.concat(noiBatList);
    }

    const filteredNews = newsList.filter(item => {
      const itemTitle = item.title.toLowerCase();
      return itemTitle.includes(query.toLowerCase());
    });

    const filteredNoiBat = noiBatList.filter(item => {
      const itemTitle = item.title.toLowerCase();
      return itemTitle.includes(query.toLowerCase());
    });

    return filteredNews.concat(filteredNoiBat);
  };

  const onGetNews = async () => {
    setLoading(true);
    const news = await getNews();
    setNews(news);
    setLoading(false);
  };

  const onGetNoiBat = async () => {
    setLoading(true);
    const noiBatData = await getNoiBat();
    setNoiBat(noiBatData);
    setLoading(false);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity>
        <View style={{flexDirection: 'row', paddingBottom: 20}}>
          <Image source={{uri: item.img}} style={styles.img_trending} />
          <View style={{paddingHorizontal: 10, width: 246, height: 96}}>
            <Text
              style={[
                {
                  color: '#000',
                  fontSize: 16,
                  fontWeight: '400',
                  paddingTop: 5,
                },
                {color: theme.color},
              ]}>
              {item.title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    onGetNews();
    onGetNoiBat();
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
            source={require('../../../../../media/img/loading_ly.gif')}
          />
        </View>
      ) : (
        <View style={[styles.T, {backgroundColor: theme.backgroundColor}]}>
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
              source={require('../../../../../media/img/user.png')}
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
                Nguyễn Đình Trưng
              </Text>
            </View>

            {/* Điểm danh */}
            <TouchableOpacity
              onPress={() => navigation.navigate('DiemDanhScreens')}>
              <Image
                style={{top: 15, marginLeft: 65}}
                source={require('../../../../../media/img/attendance.png')}
              />
            </TouchableOpacity>
            {/* Thông báo */}
            <TouchableOpacity
              onPress={() => navigation.navigate('ThongBaoScreens')}>
              <Image
                style={{top: 15, marginLeft: 10}}
                source={require('../../../../../media/img/notification.png')}
              />
            </TouchableOpacity>
            {/* 3 chấm */}
            <View style={{marginLeft: 10}}>
              <ModalDropdown
                ref={dropdownRef} // Tham chiếu đến dropdown
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
                  source={require('../../../../../media/img/menu_logout.png')}
                />
              </ModalDropdown>
            </View>
          </View>
          {/* gạch ngang */}
          <Text
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#C4C4C4',
              marginTop: 50,
              marginBottom: 10,
            }}></Text>

          {/* Điểm danh */}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              marginLeft: 20,
            }}>
            {/* Back */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={{width: 20, height: 20, top: 10}}
                source={require('../../../../../media/img/back_25px.png')}
              />
            </TouchableOpacity>
            {/* Tài khoản */}
            <Text
              style={{
                height: 30,
                fontSize: 18,
                fontWeight: 'bold',
                marginLeft: 110,
                marginBottom: 10,
                marginTop: 10,
                textAlign: 'center',
                color: '#FF8E3C',
              }}>
              Tìm kiếm
            </Text>
            <View style={{flexDirection: 'row', marginRight: 25}}></View>
          </View>

          {/* search  */}
          <View style={styles.search}>
            <Image
              style={{marginTop: 10, marginLeft: 15}}
              source={require('../../../../../media/img/search.png')}
            />
            <TextInput
              style={{paddingHorizontal: 10, width: 270}}
              placeholder="Search"
              placeholderTextColor={'#A0A3BD'}
              onChangeText={text => setSearchText(text)}
              value={searchText}
            />
          </View>

          {/* body */}
          <View style={styles.body}>
            <FlatList
              data={filterNews(news, noiBat, searchText)}
              renderItem={renderItem}
              keyExtractor={item => item._id}
              onRefresh={() => {
                onGetNews();
                onGetNoiBat();
              }}
              refreshing={loading}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default SearchScreens;

const styles = StyleSheet.create({
  // body
  img_trending: {
    width: 96,
    height: 96,
    borderRadius: 6,
  },
  body: {
    height: 560,
    padding: 24,
  },
  // header
  search: {
    flexDirection: 'row',
    height: 45,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginLeft: 20,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF8E3C',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
  },
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
    padding: 10,
  },
});
