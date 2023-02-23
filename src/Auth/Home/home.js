import React, { useState, useEffect } from 'react';

import { StatusBar, View, Image, TouchableOpacity, Text } from 'react-native';
import { Card, Button as Btn } from 'react-native-paper';
import { Colors, RF, RR } from '../../../helper/constants';

import { color } from 'react-native-reanimated';
import { H1, Hr, P } from '../../../helper/element';
import Notification from '../../../components/notification';
import { AppIcons } from '../../../helper/images';
import ConfigButton from '../../../components/configButton';
import BalanceCard from '../../../components/balanceCard';
import Carousel from '../../../components/Carousel';
import MainCard from '../../../components/mainCard';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import CircleImage from '../../../components/circleImage';
import InputText from '../../../components/textInput';
import Toast from 'react-native-toast-message';
import { Button } from '../../../component/button';
import { axiosCalls, axiosCallsNoAuth } from '../../../helper/api';
import { ToastLong } from '../../../helper/toast';
import { useStoreActions, useStoreState } from 'easy-peasy';


export const Home = props => {
  const [visible, setVisible] = useState(false);
  const [houseVisible, setHouseVisible] = useState(false);
  const [showForum, setShowForum] = useState(false);
  const [showHouses, setShowHouses] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState(false);
  const [houseActive, setHouseActive] = useState(false);
  const [editInfo, setEditInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [admins, setAdmins] = useState([]);
  const [exco, setExco] = useState('');
  const [passcode, setPasscode] = useState('');
  const [votingVisible, setVotingVisible] = useState(false);
  const [balance, setBalance] = useState(null);
  const [newElectionModal, setNewElectionModal] = useState(false)
  const [allVotes, setAllVotes] = useState(false)
  const [addNewCandidate, setAddNewCandidate] = useState(false)
  const [deleteAdminModal, setDeleteAdminModal] = useState(false)


  const admin = () => {
    setVisible(true);
    setActive('addNew');
  };

  const votingModal = () => {
    setVotingVisible(true);
  };


  const houses = () => {
    setHouseVisible(true);
    setHouseActive('addNew');
  };

  const edit = (user) => {
    setEditInfo(user);
    setActive('edit');
    console.warn(user.userId)
  };

  const createAdmin = async () => {
    try {
      if (
        name == '' ||
        phone == '' ||
        email == '' ||
        exco == '' ||
        passcode == ''
      ) {

        alert('All fields require');
      } else {
        if (phone.length != 11) {
          alert('Incorrect phone number`');
        } else {
          if (passcode.length != 4) {

            alert('Incorrect passcode');
          } else {
            setLoading(true);
            const payLoad = {
              name: name,
              phone: phone,
              email: email,
              password: passcode,
              excoRole: exco,
            };
            setLoading(true);

            console.warn('payload coming', payLoad);
            const res = await axiosCwaalls('/admins/create', 'POST', payLoad);
            if (res?.data?.success == false) {
              console.warn('responce....>>>', res.data);
              ToastLong(res.data.message);
              setLoading(false);
            } else {
              console.warn('responce....>>>', res.data);
              setLoading(false);
            }
          }
        }
      }
    } catch (e) {
      console.warn('error coming', e);
      alert('unreliable network connection');
    }
  };

  const deleteAdmin = async (id) => {
    try {
      const res = await axiosCalls(`/admins/${id}`, 'DEL');

      // setAdmins(res.data.admins);
      console.warn(res.data)

    } catch (e) {
      console.warn('get admin error...', e);
    }
  }


  useEffect(() => {
    getAdminList();
  }, []);

  useEffect(() => {
    getWalletBalance()
  }, []);

  const getAdminList = async () => {
    try {

      const res = await axiosCalls('/admins', 'GET');
      // console.warn('this is the admin list', res.data);
      // console.log('this is the admin list>>', res.data.admins[0]);
      setAdmins(res.data.admins);

      // console.warn('this is the admin list>>', res.data.admins.length);
    } catch (e) {
      console.warn('get admin error...', e);
    }
  };
  const getWalletBalance = async () => {
    try {
      console.warn('this is the wallet Balance ??>>>>');
      const res = await axiosCalls('/wallet/balance', 'GET');
      // console.warn('this is the admin list', res.data);
      // console.log('this is the Wallet balance]>>', res.data.balance);
      setBalance(res.data.balance.value);
      // console.warn('this is the admin list>>', res.data.admins.length);
    } catch (e) {
      console.warn('get Wallet Balance error...', e);
    }
  };
  const updateActive = useStoreActions(
    actions => actions.activePage.updateActive,
  );

  return (
    <View
      style={{
        flex: 1,
        paddingTop: RR(15),
        backgroundColor: Colors.appWhite,
      }}>
      <View
        style={{
          height: '10%',
          width: '100%',
          flexDirection: 'row',
        }}>
        <View
          style={{
            height: '100%',
            width: '75%',
            paddingLeft: '5%',
            justifyContent: 'center',
          }}>
          <H1>Olawaiye Estate</H1>
        </View>

        <View
          style={{
            height: '100%',
            width: '25%',
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: '100%',

              justifyContent: 'center',
            }}>
            <Notification count={10} />
          </View>

          <View
            style={{
              height: '100%',
              width: '60%',
              justifyContent: 'center',
            }}>
            <Image
              style={{ height: RF(50), width: RF(50) }}
              source={AppIcons.bell}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      <ScrollView>
        <View
          style={{
            height: RF(70),
            width: '100%',
            justifyContent: 'center',
            paddingLeft: '5%',
          }}>
          <ConfigButton />
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            paddingLeft: '5%',
            marginTop: '2%',
          }}>
          <H1 color={Colors.appPrimary}>Payment Summary</H1>
        </View>

        <Carousel
          style='slide'
          items={[
            {
              title: 'Wallet Balance',
              amount: balance,
              buttonName: "View",
              icon: "balance",
              onpress: () => updateActive('Wallet')

            },
            {
              title: 'Number of Residents',
              amount: '894',
              buttonName: "View Record",
              icon: "residence",
              onpress: () => updateActive('Commerce')

            },
            {
              title: 'Number of Houses',
              amount: '414',
              buttonName: "Pay Ahead",
              icon: "houses",
              onpress: () => updateActive('Commerce')

            },
          ]}
        />
        {/* <View
          style={{
            width: '100%',
            justifyContent: 'center',
            height: RF(170),
            paddingLeft: '5%',
            backgroundColor: "red"
          }}>
          <BalanceCard amount={'N20,412,000'} height={RF(160)} width={'95%'} buttonName="View" />
        </View> */}

        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            paddingLeft: '5%',
            marginTop: '6%',
          }}>
          <H1 color={Colors.appPrimary}>Quick Links</H1>
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            paddingHorizontal: '5%',
            paddingVertical: 10,
            flexDirection: 'row',
          }}>
          <MainCard
            text={'Admin'}
            des={'Add and manage Estate executives'}
            count={12}
            icon={AppIcons.admin}
            onPress={() => admin()}
          />
          <MainCard
            text={'House'}
            des={'Add new houses '}
            count={2}
            icon={AppIcons.house}
            onPress={() => houses()}
          />
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            paddingHorizontal: '5%',
            paddingVertical: 10,
            flexDirection: 'row',
          }}>
          <MainCard
            text={'Residence'}
            des={'Add and manage new residence'}
            count={10}
            icon={AppIcons.resident}
          // onPress={() => residence()}
          />
          <MainCard
            text={'Forum'}
            des={'Send message to all residencess.'}
            count={1}
            icon={AppIcons.chat}
            onPress={() => updateActive('Forum')}
          />
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            paddingHorizontal: '5%',
            paddingVertical: 10,
            flexDirection: 'row',
            marginBottom: '10%',
          }}>
          <MainCard
            text={'Voting System'}
            des={'Add and manage candidates'}
            count={12}
            icon={AppIcons.voting}
            //onPress={() => votingModal()}
            onPress={() => updateActive('Voting')}
          />
        </View>

        <View style={{ height: '20%' }}></View>
      </ScrollView>
      {/* Admin Modal */}
      <Modal
        isVisible={visible}
        onBackButtonPress={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}>
        {active != 'edit' ? (
          <View
            style={{
              // height: RF(800),
              width: '100%',
              paddingBottom: 30,
              backgroundColor: Colors.appWhite,
            }}>
            <TouchableOpacity
              style={{ marginTop: 15, marginLeft: 20 }}
              onPress={() => setVisible(false)}>
              <Image
                style={{ height: 17.5, width: 15 }}
                source={AppIcons.cancel}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                height: RF(50),
                flexDirection: 'row',
                marginTop: RF(0),
                paddingLeft: '30%',
              }}>
              <View
                style={{
                  height: RF(60),
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity>
                  {active == 'addNew' ? (
                    <View
                      style={{
                        height: RF(50),
                        width: RF(220),
                        flexDirection: 'row',
                        backgroundColor: '#F2F2F2',
                        paddingLeft: RF(20),
                        borderRadius: RF(20),
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingRight: RF(10),
                      }}>
                      <View style={{ marginRight: RF(0) }}>
                        <H1 size={RF(7)} color={Colors.appPrimary}>
                          {' '}
                          Add New Admin
                        </H1>
                      </View>
                      <CircleImage
                        icon={AppIcons.admin}
                        bg={Colors.appPrimary}
                      />
                    </View>
                  ) : (
                    <CircleImage
                      icon={AppIcons.admin}
                      onPress={() => setActive('addNew')}
                    />
                  )}
                </TouchableOpacity>

                <TouchableOpacity style={{ marginLeft: RF(15) }}>
                  {!active ? (
                    <View
                      style={{
                        height: RF(50),
                        width: RF(220),
                        flexDirection: 'row',
                        backgroundColor: '#F2F2F2',
                        paddingLeft: RF(25),
                        borderRadius: RF(20),
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingRight: RF(10),
                      }}>
                      <View style={{ marginRight: RF(0) }}>
                        <H1 size={RF(7)} color={Colors.appPrimary}>
                          {' '}
                          View Admins
                        </H1>
                      </View>
                      <CircleImage
                        icon={AppIcons.guest}
                        bg={Colors.appPrimary}
                      />
                    </View>
                  ) : (
                    <CircleImage
                      icon={AppIcons.guest}
                      onPress={() => setActive(false)}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                height: RF(60),
                flexDirection: 'row',
                paddingLeft: '8%',
              }}>
              <View
                style={{
                  height: RF(70),

                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <CircleImage
                  bg={Colors.appPrimary}
                  icon={active == 'addNew' ? AppIcons.admin : AppIcons.guest}
                />
              </View>
              <View
                style={{
                  height: RF(70),

                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: '5%',
                }}>
                <H1 color={Colors.appPrimary} size={RF(8)}>
                  {active == 'addNew' ? 'Add New Admin' : 'View Admins'}
                </H1>
              </View>
            </View>
            {active == 'addNew' ? (
              <View>
                <View
                  style={{ width: '100%', paddingLeft: '5%', marginTop: RF(10) }}>
                  <InputText
                    placeholder={'Full Name'}
                    ic={AppIcons.person}
                    height={45}
                    width={'95%'}
                    value={name}
                    onChange={value => setName(value)}
                  />
                </View>

                <View
                  style={{ width: '100%', paddingLeft: '5%', marginTop: RF(20) }}>
                  <InputText
                    placeholder={'Phone Number'}
                    ic={AppIcons.phone}
                    height={45}
                    width={'95%'}
                    maxLength={11}
                    keyboardType={'numeric'}
                    value={phone}
                    onChange={value => setPhone(value)}
                  />
                </View>

                <View
                  style={{ width: '100%', paddingLeft: '5%', marginTop: RF(20) }}>
                  <InputText
                    placeholder={'Email Address'}
                    ic={AppIcons.at}
                    height={45}
                    width={'95%'}
                    value={email}
                    onChange={value => setEmail(value)}
                  />
                </View>

                <View
                  style={{ width: '100%', paddingLeft: '5%', marginTop: RF(20) }}>
                  <InputText
                    placeholder={'Exco Role'}
                    ic={AppIcons.exco}
                    height={45}
                    width={'95%'}
                    value={exco}
                    onChange={value => setExco(value)}
                  />
                </View>

                <View
                  style={{ width: '100%', paddingLeft: '5%', marginTop: RF(20) }}>
                  <InputText
                    placeholder={'Passcode'}
                    ic={AppIcons.pass}
                    height={45}
                    width={'95%'}
                    value={passcode}
                    maxLength={4}
                    keyboardType={'numeric'}
                    secure={true}
                    onChange={value => setPasscode(value)}
                  />
                </View>

                <Button
                  marginTop={30}
                  text={'Submit'}
                  width={'90%'}
                  marginLeft={'5%'}
                  height={50}
                  loading={loading}
                  onPress={() => createAdmin()}
                />
              </View>
            ) : (
              <View
                style={{
                  width: '100%',
                  marginTop: RF(20),
                  height: '70%',
                  paddingHorizontal: '8%',
                }}>
                {admins?.map((user) => {
                  return (
                    <TouchableOpacity onPress={() => edit(user)}>
                      <View
                        style={{
                          width: '100%',
                          paddingLeft: '5%',
                          marginTop: RF(5),
                          backgroundColor: '#F2F2F2',
                          height: 80,
                          paddingHorizontal: '5%',
                          flexDirection: 'row',
                        }}>
                        <View
                          style={{
                            width: '50%',
                            height: '100%',
                            paddingTop: 15,
                            paddingLeft: 10,
                          }}>
                          <H1 size={RF(7)} color={'#565656'}>
                            {user.role}
                          </H1>
                        </View>
                        <View
                          style={{
                            width: '50%',
                            height: '100%',
                            paddingTop: 15,
                            paddingLeft: 10,
                          }}>
                          <P size={RF(7)} color={'#565656'}>
                            {user.name.value}
                          </P>
                          <P size={RF(7)} color={'#565656'}>
                            {user.emails[0].value}
                          </P>
                          <P size={RF(7)} color={'#565656'}>
                            {user.phoneNumbers[0].countryCode}  {user.phoneNumbers[0].value}
                          </P>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                })}


              </View>
            )}
          </View>
        ) : (
          <View
            style={{
              height: RF(700),
              width: '100%',
              backgroundColor: Colors.appWhite,
              paddingHorizontal: '5%',
            }}>
            <TouchableOpacity
              style={{ marginTop: 15 }}
              onPress={() => setActive(false)}>
              <Image
                style={{ height: 17.5, width: 15 }}
                source={AppIcons.cancel}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                height: RF(50),
                flexDirection: 'row',
                marginTop: RF(0),
                paddingLeft: '50%',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <H1 size={RF(7)} color={'#5E38AF'}>
                Admin
              </H1>

              <View style={{ marginLeft: 20 }}>
                <CircleImage icon={AppIcons.admin} />
              </View>
              <View style={{ marginLeft: 5 }}>
                <CircleImage icon={AppIcons.guest} />
              </View>
            </View>
            <View
              style={{
                width: '100%',
                height: RF(60),
                flexDirection: 'row',
                paddingLeft: '2%',
              }}>
              <View
                style={{
                  height: RF(70),
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <CircleImage bg={Colors.appPrimary} icon={AppIcons.adminedit} />
              </View>
              <View
                style={{
                  height: RF(70),

                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: '5%',
                }}>
                <Hr color={Colors.appPrimary} size={RF(8)}>
                  View Admin Details
                </Hr>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                height: '65%',
                marginTop: 20,
              }}>
              <View
                style={{
                  width: '100%',
                  height: 60,
                  paddingHorizontal: '2%',
                }}>
                <H1 size={RF(7)} color={'#716D6D'}>
                  {editInfo.name.value}
                </H1>
                <Hr size={RF(7)} color={'#716D6D'}>
                  Name
                </Hr>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 60,
                  paddingHorizontal: '2%',
                }}>
                <H1 size={RF(7)} color={'#716D6D'}>
                  {editInfo.officeAddress.value}
                </H1>
                <Hr size={RF(7)} color={'#716D6D'}>
                  Address
                </Hr>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 60,
                  paddingHorizontal: '2%',
                }}>
                <H1 size={RF(7)} color={'#716D6D'}>
                  {editInfo.emails[0].value || "N/A"}
                </H1>
                <Hr size={RF(7)} color={'#716D6D'}>
                  Email Address
                </Hr>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 60,
                  paddingHorizontal: '2%',
                }}>
                <H1 size={RF(7)} color={'#716D6D'}>
                  {editInfo.phoneNumbers[0].countryCode}  {editInfo.phoneNumbers[0].value}
                </H1>
                <Hr size={RF(7)} color={'#716D6D'}>
                  Phone Number
                </Hr>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 60,
                  paddingHorizontal: '2%',
                }}>
                <H1 size={RF(7)} color={'#716D6D'}>
                  {editInfo.role}
                </H1>
                <Hr size={RF(7)} color={'#716D6D'}>
                  Executive Role
                </Hr>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 60,
                  paddingHorizontal: '2%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => {

                }}>
                  <View
                    style={{
                      backgroundColor: '#A986A7',
                      width: 80,
                      height: 30,
                      justifyContent: 'center',
                      borderRadius: 3,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Image
                      style={{ height: 13, width: 11 }}
                      source={AppIcons.edit}
                      resizeMode="contain"
                    />
                    <View style={{ marginLeft: 10 }}>
                      <H1 size={RF(7)} color={'#FFFFFF'}>
                        Edit
                      </H1>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setDeleteAdminModal(true)}>
                  <View
                    style={{
                      backgroundColor: '#5E38AF',
                      width: 80,
                      height: 30,
                      justifyContent: 'center',
                      borderRadius: 3,
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginLeft: 40,
                    }}>
                    <Image
                      style={{ height: 13, width: 11 }}
                      source={AppIcons.del}
                      resizeMode="contain"
                    />
                    <View style={{ marginLeft: 10 }}>
                      <H1 size={RF(7)} color={'#FFFFFF'}>
                        Delete
                      </H1>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Modal>
      {/* end Admin Modal */}


      {/* House Modal */}
      <Modal
        isVisible={houseVisible}
        onBackButtonPress={() => setHouseVisible(false)}
        onBackdropPress={() => setHouseVisible(false)}>
        {houseActive != 'edit' ? (
          <View
            style={{
              // height: RF(900),
              width: '100%',
              paddingBottom: 30,
              backgroundColor: Colors.appWhite,
            }}>
            <TouchableOpacity
              style={{ marginTop: 15, marginLeft: 20 }}
              onPress={() => setHouseVisible(false)}>
              <Image
                style={{ height: 17.5, width: 15 }}
                source={AppIcons.cancel}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                height: RF(50),
                flexDirection: 'row',
                marginTop: RF(0),
                paddingLeft: '30%',
              }}>
              <View
                style={{
                  height: RF(60),
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity>
                  {houseActive == 'addNew' ? (
                    <View
                      style={{
                        height: RF(50),
                        width: RF(220),
                        flexDirection: 'row',
                        backgroundColor: '#F2F2F2',
                        paddingLeft: RF(20),
                        borderRadius: RF(20),
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingRight: RF(10),
                      }}>
                      <View style={{ marginRight: RF(0) }}>
                        <H1 size={RF(7)} color={Colors.appPrimary}>
                          {' '}
                          Add New House
                        </H1>
                      </View>
                      <CircleImage
                        icon={AppIcons.house}
                        bg={Colors.appPrimary}
                      />
                    </View>
                  ) : (
                    <CircleImage
                      icon={AppIcons.house}
                      onPress={() => setHouseActive('addNew')}
                    />
                  )}
                </TouchableOpacity>

                <TouchableOpacity style={{ marginLeft: RF(15) }}>
                  {!houseActive ? (
                    <View
                      style={{
                        height: RF(50),
                        width: RF(220),
                        flexDirection: 'row',
                        backgroundColor: '#F2F2F2',
                        paddingLeft: RF(25),
                        borderRadius: RF(20),
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingRight: RF(10),
                      }}>
                      <View style={{ marginRight: RF(0) }}>
                        <H1 size={RF(7)} color={Colors.appPrimary}>
                          {' '}
                          View Houses
                        </H1>
                      </View>
                      <CircleImage
                        icon={AppIcons.house}
                        bg={Colors.appPrimary}
                      />
                    </View>
                  ) : (
                    <CircleImage
                      icon={AppIcons.house}
                      onPress={() => setHouseActive(false)}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                height: RF(60),
                flexDirection: 'row',
                paddingLeft: '8%',
                marginVertical: 20
              }}>
              {/* 
    #TODO Add SEARCH component here
     */}
            </View>
            {houseActive == 'addNew' ? (
              <View>
                <View
                  style={{ width: '100%', paddingLeft: '5%', marginTop: RF(10) }}>
                  <InputText
                    placeholder={'House Address'}
                    ic={AppIcons.person}
                    height={45}
                    width={'95%'}
                    value={name}
                    onChange={value => setName(value)}
                  />
                </View>

                <View
                  style={{ width: '100%', paddingLeft: '5%', marginTop: RF(20) }}>
                  <InputText
                    placeholder={'Type of Building'}
                    ic={AppIcons.home}
                    height={45}
                    width={'95%'}
                    // maxLength={11}
                    // keyboardType={'numeric'}
                    value={phone}
                    onChange={value => setPhone(value)}
                  />
                </View>

                <View
                  style={{ width: '100%', paddingLeft: '5%', marginTop: RF(20) }}>
                  <InputText
                    placeholder={'Building Description'}
                    ic={AppIcons.home}
                    height={45}
                    width={'95%'}
                    value={email}
                    onChange={value => setEmail(value)}
                  />
                </View>

                <View
                  style={{ width: '100%', paddingLeft: '5%', marginTop: RF(20) }}>
                  <InputText
                    placeholder={`Owner's Name`}
                    ic={AppIcons.exco}
                    height={45}
                    width={'95%'}
                    value={exco}
                    onChange={value => setExco(value)}
                  />
                </View>


                <View
                  style={{ width: '100%', paddingLeft: '5%', marginTop: RF(20) }}>
                  <InputText
                    placeholder={'Email Address'}
                    ic={AppIcons.at}
                    height={45}
                    width={'95%'}
                    value={email}
                    onChange={value => setEmail(value)}
                  />
                </View>

                <View
                  style={{ width: '100%', paddingLeft: '5%', marginTop: RF(10) }}>
                  <InputText
                    placeholder={'Name of Agent in-charge'}
                    ic={AppIcons.person}
                    height={45}
                    width={'95%'}
                    value={name}
                    onChange={value => setName(value)}
                  />
                </View>

                <View
                  style={{ width: '100%', paddingLeft: '5%', marginTop: RF(20) }}>
                  <InputText
                    placeholder={'Number of Agent in-charge'}
                    ic={AppIcons.phone}
                    height={45}
                    width={'95%'}
                    maxLength={11}
                    keyboardType={'numeric'}
                    value={phone}
                    onChange={value => setPhone(value)}
                  />
                </View>


                <Button
                  marginTop={30}
                  text={'Submit'}
                  width={'90%'}
                  marginLeft={'5%'}
                  height={50}
                  loading={loading}
                  onPress={() => createAdmin()}
                />
              </View>
            ) : (
              <View
                style={{
                  width: '100%',
                  marginTop: RF(5),
                  height: '70%',
                  paddingHorizontal: '2%',
                }}>

                <TouchableOpacity>
                  <View
                    style={{ width: '100%', paddingLeft: '2%', marginTop: RF(5) }}>
                    <InputText
                      placeholder={'Search by name or house number'}
                      ic={AppIcons.person}
                      height={45}
                      width={'95%'}
                      value={name}
                      onChange={value => setName(value)}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <View
            style={{
              height: RF(700),
              width: '100%',
              backgroundColor: Colors.appWhite,
              paddingHorizontal: '5%',
            }}>
            <TouchableOpacity
              style={{ marginTop: 15 }}
              onPress={() => setActive(false)}>
              <Image
                style={{ height: 17.5, width: 15 }}
                source={AppIcons.cancel}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                height: RF(50),
                flexDirection: 'row',
                marginTop: RF(0),
                paddingLeft: '50%',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <H1 size={RF(7)} color={'#5E38AF'}>
                Admin
              </H1>

              <View style={{ marginLeft: 20 }}>
                <CircleImage icon={AppIcons.admin} />
              </View>
              <View style={{ marginLeft: 5 }}>
                <CircleImage icon={AppIcons.guest} />
              </View>
            </View>
            <View
              style={{
                width: '100%',
                height: RF(60),
                flexDirection: 'row',
                paddingLeft: '2%',
              }}>
              <View
                style={{
                  height: RF(70),
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <CircleImage bg={Colors.appPrimary} icon={AppIcons.adminedit} />
              </View>
              <View
                style={{
                  height: RF(70),

                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: '5%',
                }}>
                <Hr color={Colors.appPrimary} size={RF(8)}>
                  View Admin Details
                </Hr>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                height: '65%',
                marginTop: 20,
              }}>
              <View
                style={{
                  width: '100%',
                  height: 60,
                  paddingHorizontal: '2%',
                }}>
                <H1 size={RF(7)} color={'#716D6D'}>
                  Charles Avis
                </H1>
                <Hr size={RF(7)} color={'#716D6D'}>
                  Name
                </Hr>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 60,
                  paddingHorizontal: '2%',
                }}>
                <H1 size={RF(7)} color={'#716D6D'}>
                  18 Road 55,
                </H1>
                <Hr size={RF(7)} color={'#716D6D'}>
                  Address
                </Hr>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 60,
                  paddingHorizontal: '2%',
                }}>
                <H1 size={RF(7)} color={'#716D6D'}>
                  avischarles@info.com
                </H1>
                <Hr size={RF(7)} color={'#716D6D'}>
                  Email Address
                </Hr>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 60,
                  paddingHorizontal: '2%',
                }}>
                <H1 size={RF(7)} color={'#716D6D'}>
                  07012127878
                </H1>
                <Hr size={RF(7)} color={'#716D6D'}>
                  Phone Number
                </Hr>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 60,
                  paddingHorizontal: '2%',
                }}>
                <H1 size={RF(7)} color={'#716D6D'}>
                  Chairman
                </H1>
                <Hr size={RF(7)} color={'#716D6D'}>
                  Executive Role
                </Hr>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 60,
                  paddingHorizontal: '2%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => {

                }}>
                  <View
                    style={{
                      backgroundColor: '#A986A7',
                      width: 80,
                      height: 30,
                      justifyContent: 'center',
                      borderRadius: 3,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Image
                      style={{ height: 13, width: 11 }}
                      source={AppIcons.edit}
                      resizeMode="contain"
                    />
                    <View style={{ marginLeft: 10 }}>
                      <H1 size={RF(7)} color={'#FFFFFF'}>
                        Edit
                      </H1>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setshowModal(true)}>
                  <View
                    style={{
                      backgroundColor: '#5E38AF',
                      width: 80,
                      height: 30,
                      justifyContent: 'center',
                      borderRadius: 3,
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginLeft: 40,
                    }}>
                    <Image
                      style={{ height: 13, width: 11 }}
                      source={AppIcons.del}
                      resizeMode="contain"
                    />
                    <View style={{ marginLeft: 10 }}>
                      <H1 size={RF(7)} color={'#FFFFFF'}>
                        Delete
                      </H1>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Modal>
      {/* End House Modal  */}


      {/* Start Voting System Modal  */}
      <Modal
        isVisible={votingVisible}
        onBackButtonPress={() => setVotingVisible(false)}
        onBackdropPress={() => setVotingVisible(false)}>
        <View
          style={{
            //  height: RF(500),
            width: '100%',
            paddingBottom: 10,
            backgroundColor: Colors.appWhite,
          }}>
          <TouchableOpacity
            style={{ marginTop: 15, marginLeft: 20 }}
            onPress={() => setVotingVisible(false)}>
            <Image
              style={{ height: 17.5, width: 15 }}
              source={AppIcons.cancel}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>


        <View
          style={{
            height: RF(700),
            width: '100%',
            backgroundColor: Colors.appWhite,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <TouchableOpacity style={{
            marginBottom: RF(15),
            backgroundColor: '#F2F2F2',
            width: RF(320),
            height: RF(40),
            justifyContent: 'center',
            paddingLeft: RF(20)
          }}
            onPress={() => setNewElectionModal(true)}
          >
            <P size={RF(13)} color={Colors.appPrimary}>Start New Election</P>
          </TouchableOpacity>
          <TouchableOpacity style={{
            marginBottom: RF(15),
            backgroundColor: '#F2F2F2',
            width: RF(320),
            height: RF(40),
            justifyContent: 'center',
            paddingLeft: RF(20)


          }}>
            <P size={RF(13)} color={Colors.appPrimary}>Ongoing Election</P>
          </TouchableOpacity>
          <TouchableOpacity style={{
            marginBottom: RF(15),
            backgroundColor: '#F2F2F2',
            width: RF(320),
            height: RF(40),
            justifyContent: 'center',
            paddingLeft: RF(20)

          }}>
            <P size={RF(13)} color={Colors.appPrimary}>End Election</P>
          </TouchableOpacity>
        </View>

      </Modal>

      {/* Micheal Voting system modal */}
      <Modal
        isVisible={newElectionModal}
        onBackButtonPress={() => setNewElectionModal(false)}
        onBackdropPress={() => setNewElectionModal(false)}>

      </Modal>

      {/* End Micheal Voting system modal */}


      {/* Delete admin modal */}

      <Modal
        isVisible={deleteAdminModal}
        onBackButtonPress={() => setDeleteAdminModal(false)}
        onBackdropPress={() => setDeleteAdminModal(false)}>


        <View
          style={{
            //  height: RF(500),
            width: '90%',
            paddingBottom: 10,
            backgroundColor: Colors.appWhite,
            marginHorizontal: RF(10)

          }}>
          <TouchableOpacity
            style={{ marginTop: 15, marginLeft: 20 }}
            onPress={() => setVotingVisible(false)}>
            <Image
              style={{ height: 17.5, width: 15 }}
              source={AppIcons.cancel}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View
            style={{
              marginHorizontal: RF(20),
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              width: '90%',
              marginTop: RF(4)
            }}
          >
            <Text style={{
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: RF(13),
              width: '80%',
              textAlign: 'center',
              lineHeight: RF(24)
            }}>Are you sure you want to delete this admin</Text>

          </View>


          <View
            style={{
              width: '100%',
              height: 60,
              paddingHorizontal: '2%',
              flexDirection: 'row',
              alignItems: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',

            }}>
            <TouchableOpacity onPress={() => {
              setDeleteAdminModal(false)
            }}>
              <View
                style={{
                  backgroundColor: '#A986A7',
                  width: 80,
                  height: 30,
                  justifyContent: 'center',
                  borderRadius: 3,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Image
                  style={{ height: 13, width: 11 }}
                  source={AppIcons.edit}
                  resizeMode="contain"
                />
                <View style={{ marginLeft: 10 }}>
                  <H1 size={RF(7)} color={'#FFFFFF'}>
                    Cancel
                  </H1>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setshowModal(true)}>
              <View
                style={{
                  backgroundColor: '#5E38AF',
                  width: 80,
                  height: 30,
                  justifyContent: 'center',
                  borderRadius: 3,
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginLeft: 40,
                }}>
                <Image
                  style={{ height: 13, width: 11 }}
                  source={AppIcons.del}
                  resizeMode="contain"
                />
                <View style={{ marginLeft: 10 }}>
                  <H1 size={RF(7)} color={'#FFFFFF'}>
                    Delete
                  </H1>
                </View>
              </View>
            </TouchableOpacity>
          </View>


        </View>

      </Modal>


      {/* end Delete admin modal */}

      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default Home;



