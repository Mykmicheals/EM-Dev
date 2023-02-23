import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  Text,
  Linking,
  Alert,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';

import {useStoreActions, useStoreState} from 'easy-peasy';

import Home from '../src/Auth/Home/home';
import Commerce from '../src/Auth/Home/commerce';
import Payment from '../src/Auth/Home/payment';
import Service from '../src/Auth/Home/service';
import Wallet from '../src/Auth/Home/wallet';
import Forum from '../src/Auth/Home/forum';
import House from '../src/Auth/Home/house';
import Voting from '../src/Auth/Home/voting'
import CircleImage from '../components/circleImage';
import {AppIcons} from '../helper/images';
import {Colors, RF} from '../helper/constants';

// import {Success} from '../Home/success';

const Page = props => {
  const {realActive} = useStoreState(state => ({
    realActive: state.activePage.active,
  }));

  // const {requestCount} = useStoreState(state => ({
  //   requestCount: state.requestCount.count,
  // }));
  const updaterequestCount = useStoreActions(
    actions => actions.requestCount.updateRequestCount,
  );

  const {requestCount} = useStoreState(state => ({
    requestCount: state.requestCount.count,
  }));
  const [countR, setCountR] = useState(0);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState('Home2');
  const all = () => {};
  const updateActive = useStoreActions(
    actions => actions.activePage.updateActive,
  );

  useEffect(() => {
    // console.warn('yy');
  }, [realActive]);

  return (
    <View style={{flex: 1}}>
      <View style={{height: '90%'}}>
        {realActive == 'Home' ? <Home props={props} /> : null}
        {realActive == 'Commerce' ? <Commerce props={props} /> : null}
        {realActive == 'Payment' ? <Payment props={props} /> : null}
        {realActive == 'Forum' ? <Forum props={props} /> : null}
        {realActive == 'House' ? <House props={props} /> : null}
        {realActive == 'Service' ? <Service props={props} /> : null}
        {realActive == 'Wallet' ? <Wallet props={props} /> : null}
        {realActive == 'Voting' ? <Voting props={props} /> : null}
     
      </View>
      <View
        style={{
          height: '10%',

          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            height: '100%',

            width: '15%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => updateActive('Home')}>
            {(realActive == 'Home') || realActive == "Forum" ? (
              <View style={{marginTop: '-10%'}}>
                <CircleImage
                  height={RF(60)}
                  width={RF(60)}
                  bg={Colors.appPrimary}
                  icon={AppIcons.home2}
                  onPress={() => updateActive('Home')}
                />
              </View>
            ) : (
              <Image
                style={{height: RF(70), width: RF(70)}}
                source={AppIcons.gHome}
                resizeMode={'contain'}
                tintColor={'#9E9797'}
              />
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: '100%',

            width: '15%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => updateActive('Payment')}>
            {realActive == 'Payment' ? (
              <View style={{marginTop: '-10%'}}>
                <CircleImage
                  height={RF(60)}
                  width={RF(60)}
                  bg={Colors.appPrimary}
                  icon={AppIcons.oPayment}
                  onPress={() => updateActive('Payment')}
                />
              </View>
            ) : (
              <Image
                style={{height: RF(70), width: RF(70)}}
                source={AppIcons.gPayment}
                resizeMode={'contain'}
              />
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: '100%',

            width: '15%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => updateActive('Commerce')}>
            {realActive == 'Commerce' ? (
              <View style={{marginTop: '-10%'}}>
                <CircleImage
                  height={RF(60)}
                  width={RF(60)}
                  bg={Colors.appPrimary}
                  icon={AppIcons.oCommerce}
                  onPress={() => updateActive('Commerce')}
                />
              </View>
            ) : (
              <Image
                style={{height: RF(70), width: RF(70)}}
                source={AppIcons.gCommerce}
                resizeMode={'contain'}
                tintColor={'#9E9797'}
              />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: '100%',

            width: '15%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => updateActive('Service')}>
            {realActive == 'Service' ? (
              <View style={{marginTop: '-10%'}}>
                <CircleImage
                  height={RF(60)}
                  width={RF(60)}
                  bg={Colors.appPrimary}
                  icon={AppIcons.oService}
                  onPress={() => updateActive('Service')}
                />
              </View>
            ) : (
              <Image
                style={{height: RF(70), width: RF(70)}}
                source={AppIcons.gService}
                resizeMode={'contain'}
                tintColor={'#9E9797'}
              />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: '100%',
            width: '15%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => updateActive('Wallet')}>
            {realActive == 'Wallet' ? (
              <View style={{marginTop: '-10%'}}>
                <CircleImage
                  height={RF(60)}
                  width={RF(60)}
                  bg={Colors.appPrimary}
                  icon={AppIcons.oWallet}
                  onPress={() => updateActive('Wallet')}
                />
              </View>
            ) : (
              <Image
                style={{height: RF(70), width: RF(70)}}
                source={AppIcons.gWallet}
                resizeMode={'contain'}
                tintColor={'#9E9797'}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Page;
