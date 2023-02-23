import React, {useState, useEffect} from 'react';
import {Container} from '../../helper';
import {
  StatusBar,
  View,
  Image,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import {H1, P} from '../../../helper/element';
import {Button} from '../../../component/button';
import {Colors, RF, RR} from '../../../helper/constants';
import {AppIcons} from '../../../helper/images';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import InputText from '../../../components/textInput';
import WalletCard from '../../../components/walletCard';
import CheckBox from 'react-native-check-box';
import TransactionCard from '../../../components/transactionCard';
import CircleImage from '../../../components/circleImage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { axiosCalls } from '../../../helper/api';

export const Commerce = props => {
  const [visible, setVisible] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [modal, setModal] = useState(false);
  const [arenaModal, setArenaModal] = useState(false);
  const [investModal, setInvestModal] = useState(false);
  const [active, setActive] = useState('goods');
  const [foods, setFoods]  = useState([])
  

  const getFoods = async()=>{
    try {
      const res = await axiosCalls('/foods', 'GET');
     // setBalance(res.data.balance.value);
     console.warn(res.data)
   
    } catch (e) {
      console.warn('fetching foods', e);
    }
  };
  

  useEffect(()=>{
    getFoods()
  },[])


  return (
    <View
      style={{
        flex: 1,
        paddingTop: RR(15),
        paddingHorizontal: '5%',
        backgroundColor: '#E5E5E5',
      }}>
      <View
        style={{
          width: '39%',
          alignItems: 'flex-start',
          marginLeft: '0%',
        }}>
        <H1
          style={{
            color: Colors.appPrimary,
            fontSize: 15,
            marginLeft: '3%',
          }}>
          Commerce
        </H1>
      </View>
      <View
        style={{
          height: '10%',
          width: '100%',

          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => setActive('realEstate')}>
          {active == 'realEstate' ? (
            <View
              style={{
                height: RF(50),
                width: RF(130),
                flexDirection: 'row',
                backgroundColor: '#F2F2F2',
                paddingLeft: RF(3),
                borderRadius: RF(20),
                alignItems: 'center',
              }}>
              <CircleImage icon={AppIcons.realEstate} />
              <View style={{marginLeft: RF(0)}}>
                <H1 size={RF(6)} color={Colors.appPrimary}>
                  Real Estate
                </H1>
              </View>
            </View>
          ) : (
              <CircleImage icon={AppIcons.realEstate} onPress={() => setActive('realEstate')} />
          )}
        </TouchableOpacity>
        <View style={{marginLeft: RF(10)}}>
          <TouchableOpacity onPress={() => setActive('food')}>
            {active == 'food' ? (
              <View
                style={{
                  height: RF(50),
                  width: RF(130),
                  flexDirection: 'row',
                  backgroundColor: '#F2F2F2',
                  paddingLeft: RF(3),
                  borderRadius: RF(20),
                  alignItems: 'center',
                }}>
                <CircleImage icon={AppIcons.food} />
                <View style={{marginLeft: RF(0)}}>
                  <H1 size={RF(7)} color={Colors.appPrimary}>
                    Food
                  </H1>
                </View>
              </View>
            ) : (
                <CircleImage icon={AppIcons.food} onPress={() => setActive('food')} />
            )}
          </TouchableOpacity>
        </View>
        <View style={{marginLeft: RF(10)}}>
          <TouchableOpacity onPress={() => setActive('goods')}>
            {active == 'goods' ? (
              <View
                style={{
                  height: RF(50),
                  width: RF(130),
                  flexDirection: 'row',
                  backgroundColor: '#F2F2F2',
                  paddingLeft: RF(3),
                  borderRadius: RF(20),
                  alignItems: 'center',
                }}>
                <CircleImage icon={AppIcons.bag} />
                <View style={{marginLeft: RF(0)}}>
                  <H1 size={RF(7)} color={Colors.appPrimary}>
                    Goods
                  </H1>
                </View>
              </View>
            ) : (
                <CircleImage icon={AppIcons.bag} onPress={() => setActive('goods')} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          marginTop: RF(10),

          justifyContent: 'center',
          alignItems: 'center',
        }}>


        {active == 'realEstate' ? (
          <P color={Colors.appTextBlack} size={RF(10)}>
            Properties posted for purchase, lease and rent
          </P>
        ) : active == 'food' ? (
          <P color={Colors.appTextBlack} size={RF(10)}>
            Posted food items for sales
          </P>
        ) : (
          <P color={Colors.appTextBlack} size={RF(10)}>
            Posted household items for sales
          </P>
        )}
      </View>
      {active == 'realEstate' ? (
        <TouchableOpacity onPress={() => setModal(true)}>
          <View
            style={{
              width: '100%',
              height: RF(90),
              backgroundColor: 'rgba(217, 217, 217, 0.21)',
              marginTop: RF(55),
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: '10%',
                height: RF(90),
                paddingVertical: 8,
              }}>
              <CheckBox
                style={{
                  flex: 1,
                }}
                onClick={() => {
                  setSelection(!isSelected);
                }}
                isChecked={isSelected}
                checkBoxColor={'#A3A1A1'}
              />
            </View>

            <View
              style={{
                width: '70%',
                height: RF(90),
                paddingLeft: 2,
                paddingVertical: 8,
              }}>
              <P size={RF(10)}>5 Bedroom Duplex</P>

              <H1 size={RF(10)}>N1,250,000</H1>
            </View>

            <View
              style={{
                width: '20%',
                height: RF(90),
                paddingVertical: 8,
              }}>
              <P size={RF(10)} color={Colors.appPrimary}>
                60 Days{' '}
              </P>
            </View>
          </View>
        </TouchableOpacity>
      ) : active == 'food' ? (
          <TouchableOpacity onPress={() => setArenaModal(true)}>
            <View
              style={{
                width: '100%',
                height: RF(90),
                backgroundColor: 'rgba(217, 217, 217, 0.21)',
                marginTop: RF(15),
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '10%',
                  height: RF(90),
                  paddingVertical: 8,
                }}>
                <CheckBox
                  style={{
                    flex: 1,
                  }}
                  onClick={() => {
                    setSelection(!isSelected);
                  }}
                  isChecked={isSelected}
                  checkBoxColor={'#A3A1A1'}
                />
              </View>

              <View
                style={{
                  width: '70%',
                  height: RF(90),
                  paddingLeft: 2,
                  paddingVertical: 8,
                }}>
                <P size={RF(10)}>5litres of Oha Soup </P>

                <H1 size={RF(10)}>N5,000</H1>
              </View>

              <View
                style={{
                  width: '20%',
                  height: RF(90),
                  paddingVertical: 8,
                }}>
                <P size={RF(10)} color={Colors.appPrimary}>
                  60 Days{' '}
                </P>
              </View>
            </View>
          </TouchableOpacity>
      ) : (
            <TouchableOpacity onPress={() => setInvestModal(true)}>
              <View
                style={{
                  width: '100%',
                  height: RF(90),
                  backgroundColor: 'rgba(217, 217, 217, 0.21)',
                  marginTop: RF(15),
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: '10%',
                    height: RF(90),
                    paddingVertical: 8,
                  }}>
                  <CheckBox
                    style={{
                      flex: 1,
                    }}
                    onClick={() => {
                      setSelection(!isSelected);
                    }}
                    isChecked={isSelected}
                    checkBoxColor={'#A3A1A1'}
                  />
                </View>

                <View
                  style={{
                    width: '70%',
                    height: RF(90),
                    paddingLeft: 2,
                    paddingVertical: 8,
                  }}>
                  <P size={RF(10)}>Wooden Floor Mop </P>

                  <H1 size={RF(10)}>N1,500</H1>
                </View>

                <View
                  style={{
                    width: '20%',
                    height: RF(90),
                    paddingVertical: 8,
                  }}>
                  <P size={RF(10)} color={Colors.appPrimary}>
                    60 Days{' '}
                  </P>
                </View>
              </View>
            </TouchableOpacity>
      )}


      <Modal animationType="slide" transparent={true} visible={modal}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: '#000000aa',
            paddingTop: '15%',
          }}>
          <View
            style={{
              height: '85%',
              width: '95%',

              alignItems: 'center',
              backgroundColor: 'white',
              paddingHorizontal: '5%',
            }}>
            <View
              style={{
                height: '10%',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '5%',
              }}>
              <TouchableOpacity onPress={() => setModal(false)}>
                <Image
                  style={{height: 19.5, width: 17}}
                  source={AppIcons.cancel}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <Text
                style={{fontSize: 14, color: '#A986A7', fontWeight: 'bold'}}>
                Details
              </Text>
            </View>

            <View
              style={{
                height: '12%',
                width: '100%',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 13, color: '#A986A7'}}>Duration</Text>

                <View style={{marginLeft: '30%'}}>
                  <Text style={{fontSize: 13, color: '#A986A7'}}>
                    Advert Space Cost
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '45%'}}>
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#716D6D',
                      fontWeight: 'bold',
                    }}>
                    60 Days
                  </Text>
                </View>

                <Text style={{fontSize: 13, color: '#716D6D'}}>N12,000</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '45%'}}></View>

                <Text style={{fontSize: 9, color: '#716D6D'}}>
                  Auto Renewal
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                borderBottomWidth: 1,
                borderColor: '#C4C4C4',
              }}></View>

            <View
              style={{
                height: '10%',
                width: '100%',
                justifyContent: 'center',
              }}>
              <Text
                style={{fontSize: 13, color: '#A986A7', fontWeight: 'bold'}}>
                Category
              </Text>
              <Text style={{fontSize: 13, color: '#716D6D'}}>Rent</Text>
            </View>

            <View
              style={{
                height: '10%',
                width: '100%',
              }}>
              <Text
                style={{fontSize: 13, color: '#A986A7', fontWeight: 'bold'}}>
                Title
              </Text>
              <Text style={{fontSize: 13, color: '#716D6D'}}>
                Furnished 3 Bedroom Bungalow
              </Text>
            </View>

            <View
              style={{
                height: '35%',
                width: '100%',
              }}>
              <Text
                style={{fontSize: 13, color: '#A986A7', fontWeight: 'bold'}}>
                Details
              </Text>
              <Text style={{fontSize: 13, color: '#716D6D'}}>
                This property is just 8months old and on half plot of land,
                fenced with gate and borehole, with another 2 bed room flat boys
                courter at the back.
              </Text>
              <Text style={{fontSize: 13, color: '#716D6D'}}>2 bathrooms</Text>
              <Text style={{fontSize: 13, color: '#716D6D'}}>
                Parking Space
              </Text>
              <Text style={{fontSize: 13, color: '#716D6D'}}>
                Kitchen Cabinets
              </Text>
              <Text style={{fontSize: 13, color: '#716D6D'}}>Pop Ceiling</Text>
              <Text style={{fontSize: 13, color: '#716D6D'}}>
                Dishwasher 24-hour Electricity
              </Text>
              <Text style={{fontSize: 13, color: '#716D6D'}}>
                24-hour Electricity
              </Text>
            </View>

            <View
              style={{
                height: '10%',
                width: '100%',
              }}>
              <Text
                style={{fontSize: 13, color: '#A986A7', fontWeight: 'bold'}}>
                Phone Number
              </Text>
              <Text style={{fontSize: 13, color: '#716D6D'}}>07012127878</Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 60,
                paddingHorizontal: '2%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                border: 2,

              }}>
              <Button
                text={'Decline'}
                width={80}
                height={30}
                bg={Colors.appWhite}
                color={Colors.appPrimary}
                borderWidth={1}
                // marginLeft={'5%'}
                onPress={() => { setModal(false) }}
              />

              <Button
                text={'Approve'}
                width={80}
                height={30}
                marginLeft={'5%'}
                onPress={() => { setModal(false) }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={arenaModal}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: '#000000aa',
            paddingTop: '15%',
          }}>
          <View
            style={{
              height: '85%',
              width: '95%',

              alignItems: 'center',
              backgroundColor: 'white',
              paddingHorizontal: '5%',
            }}>
            <View
              style={{
                height: '10%',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '5%',
              }}>
              <TouchableOpacity onPress={() => setArenaModal(false)}>
                <Image
                  style={{height: 19.5, width: 17}}
                  source={AppIcons.cancel}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <Text
                style={{fontSize: 14, color: '#A986A7', fontWeight: 'bold'}}>
                Details
              </Text>
            </View>

            <View
              style={{
                height: '12%',
                width: '100%',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 13, color: '#A986A7'}}>Duration</Text>

                <View style={{marginLeft: '30%'}}>
                  <Text style={{fontSize: 13, color: '#A986A7'}}>
                    Advert Space Cost
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '45%'}}>
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#716D6D',
                      fontWeight: 'bold',
                    }}>
                    60 Days
                  </Text>
                </View>

                <Text style={{fontSize: 13, color: '#716D6D'}}>N12,000</Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                borderBottomWidth: 1,
                borderColor: '#C4C4C4',
              }}></View>

            <View
              style={{
                height: '10%',
                width: '100%',
                justifyContent: 'center',
              }}>
              <Text
                style={{fontSize: 13, color: '#A986A7', fontWeight: 'bold'}}>
                Title
              </Text>
              <Text style={{fontSize: 13, color: '#716D6D'}}>
                5 Litres - Oha Soup
              </Text>
            </View>

            <View
              style={{
                height: '25%',
                width: '100%',
              }}>
              <Text
                style={{fontSize: 13, color: '#A986A7', fontWeight: 'bold'}}>
                Details
              </Text>
              <Text style={{fontSize: 13, color: '#716D6D'}}>
                Soup for 10 persons, prepared in a decent environment
              </Text>
              <Text style={{fontSize: 13, color: '#716D6D'}}>Crayfish</Text>
              <Text style={{fontSize: 13, color: '#716D6D'}}>
                Protein of choice
              </Text>
              <Text style={{fontSize: 13, color: '#716D6D'}}>Oporoko</Text>
              <Text style={{fontSize: 13, color: '#716D6D'}}>Egu leaf</Text>
            </View>

            <View
              style={{
                height: '10%',
                width: '100%',
              }}>
              <Text
                style={{fontSize: 13, color: '#A986A7', fontWeight: 'bold'}}>
                Phone Number
              </Text>
              <Text style={{fontSize: 13, color: '#716D6D'}}>07012127878</Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 60,
                paddingHorizontal: '2%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                border: 2,

              }}>
              <Button
                text={'Decline'}
                width={80}
                height={30}
                bg={Colors.appWhite}
                color={Colors.appPrimary}
                borderWidth={1}
                // marginLeft={'5%'}
                onPress={() => { setArenaModal(false) }}
              />

              <Button
                text={'Approve'}
                width={80}
                height={30}
                marginLeft={'5%'}
                onPress={() => { setArenaModal(false) }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={investModal}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: '#000000aa',
            paddingTop: '15%',
          }}>
          <View
            style={{
              height: '85%',
              width: '95%',

              alignItems: 'center',
              backgroundColor: 'white',
              paddingHorizontal: '5%',
            }}>
            <View
              style={{
                height: '10%',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '5%',
              }}>
              <TouchableOpacity onPress={() => setInvestModal(false)}>
                <Image
                  style={{height: 19.5, width: 17}}
                  source={AppIcons.cancel}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <Text
                style={{fontSize: 14, color: '#A986A7', fontWeight: 'bold'}}>
                Details
              </Text>
            </View>

            <View
              style={{
                height: '12%',
                width: '100%',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 13, color: '#A986A7'}}>Duration</Text>

                <View style={{marginLeft: '30%'}}>
                  <Text style={{fontSize: 13, color: '#A986A7'}}>
                    Advert Space Cost
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '45%'}}>
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#716D6D',
                      fontWeight: 'bold',
                    }}>
                    60 Days
                  </Text>
                </View>

                <Text style={{fontSize: 13, color: '#716D6D'}}>N12,000</Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                borderBottomWidth: 1,
                borderColor: '#C4C4C4',
              }}></View>

            <View
              style={{
                height: '10%',
                width: '100%',
                justifyContent: 'center',
              }}>
              <Text
                style={{fontSize: 13, color: '#A986A7', fontWeight: 'bold'}}>
                Category
              </Text>
              <Text style={{fontSize: 13, color: '#716D6D'}}>Household</Text>
            </View>

            <View
              style={{
                height: '10%',
                width: '100%',
                justifyContent: 'center',
              }}>
              <Text
                style={{fontSize: 13, color: '#A986A7', fontWeight: 'bold'}}>
                Title
              </Text>
              <Text style={{fontSize: 13, color: '#716D6D'}}>
                Avis Household Stores
              </Text>
            </View>

            <View
              style={{
                height: '10%',
                width: '100%',
                justifyContent: 'center',
              }}>
              <Text
                style={{fontSize: 13, color: '#A986A7', fontWeight: 'bold'}}>
                Details
              </Text>
              <Text style={{fontSize: 13, color: '#716D6D'}}>
                Your one stop shop for all your household items
              </Text>
            </View>

            <View
              style={{
                height: '10%',
                width: '100%',
              }}>
              <Text
                style={{fontSize: 13, color: '#A986A7', fontWeight: 'bold'}}>
                Phone Number
              </Text>
              <Text style={{fontSize: 13, color: '#716D6D'}}>07012127878</Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 60,
                paddingHorizontal: '2%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                border: 2,

              }}>
              <Button
                text={'Decline'}
                width={80}
                height={30}
                bg={Colors.appWhite}
                color={Colors.appPrimary}
                borderWidth={1}
                // marginLeft={'5%'}
                onPress={() => { setInvestModal(false) }}
              />

              <Button
                text={'Approve'}
                width={80}
                height={30}
                marginLeft={'5%'}
                onPress={() => { setInvestModal(false) }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Commerce;
