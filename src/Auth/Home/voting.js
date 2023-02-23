import React, {useState, useEffect} from 'react';

import {StatusBar, View, Image, TouchableOpacity} from 'react-native';

import {Colors, RF, RR} from '../../../helper/constants';

import {color} from 'react-native-reanimated';
import {H1, P} from '../../../helper/element';
import Notification from '../../../components/notification';
import {AppIcons} from '../../../helper/images';
import ConfigButton from '../../../components/configButton';
import BalanceCard from '../../../components/balanceCard';
import MainCard from '../../../components/mainCard';
import Modal from 'react-native-modal';
import {Width} from '../../../helper';
import CircleImage from '../../../components/circleImage';
import InputText from '../../../components/textInput';
import {Button} from '../../../component/button';




export const Payment = props => {
  const [visible, setVisible] = useState(false);
  const [payment, setPayment] = useState(false);
  const [clickedTitle, setClickedTitle] = useState('');
  const [active, setActive] = useState('');

const [newElectionModal, setNewElectionModal] =useState(false)
const [allVotes, setAllVotes] = useState(false)
const [addNewCandidate,setAddNewCandidate] = useState(false)

const [votingVisible, setVotingVisible] = useState(true);
const [name, setName] = useState('');
const [exco, setExco] = useState('');
const [loading, setLoading] = useState(false);

  const Estate = value => {
    setClickedTitle(value);
    setActive('Estate');
    setVisible(true);
  };
  const Water = value => {
    setClickedTitle(value);
    setActive('Water');
    setVisible(true);
  };

  const Waste = value => {
    setClickedTitle(value);
    setActive('Waste');
    setVisible(true);
  };

  const Project = value => {
    setClickedTitle(value);
    setActive('Project');
    setVisible(true);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: RR(15),
        backgroundColor: Colors.appWhite,
      }}>


        <View
      style={{
        flex: 1,
        paddingTop: RR(15),
        backgroundColor: Colors.appWhite,
      }}>
      <View
        style={{
          width: '100%',
          paddingLeft: '5%',
        }}>
        <P color={Colors.appPrimary}>Voting System</P>
      </View>

      <View
        style={{
          height: '10%',
          width: '100%',
          paddingLeft: '5%',

          flexDirection: 'row',
          marginTop: '5%',
        }}>
        <TouchableOpacity
          style={{
            height: '70%',
            width: '45%',
            backgroundColor: !allVotes ? Colors.appPrimary : Colors.appWhite,
            borderWidth: 1,
            borderColor: Colors.appPrimary,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
          }}
          onPress={() => setAllVotes(false)}>
          <H1 color={allVotes ? Colors.appPrimary : Colors.appWhite}>Candidates</H1>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: '70%',
            width: '45%',
            backgroundColor: allVotes ? Colors.appPrimary : Colors.appWhite,
            borderWidth: 1,
            borderColor: Colors.appPrimary,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
          }}
          onPress={() => setAllVotes(true)}>
          <H1 color={!allVotes ? Colors.appPrimary : Colors.appWhite}>
            All Votes
          </H1>
        </TouchableOpacity>
      </View>
      

  {! allVotes &&    <View
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
                  {addNewCandidate ? (
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
                      
                          Add New Candidate
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
                      onPress={() => setAddNewCandidate(true)}
                    />
                  )}
                </TouchableOpacity>

                <TouchableOpacity style={{ marginLeft: RF(15) }}>
                  {!addNewCandidate ? (
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
                          View Candidates
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
                      onPress={() => setAddNewCandidate(false)}
                    />
                  )}
                </TouchableOpacity>
              </View>
    </View>}


{!allVotes ?<View>

{addNewCandidate? <View>
              <View style={{
                marginTop:RF(50),
                paddingLeft: '5%'
              }}>
              <P size={RF(13)} color={Colors.appPrimary}>New Candidate</P>   
              </View>
            
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
                    placeholder={'Exco Role'}
                    ic={AppIcons.exco}
                    height={45}
                    width={'95%'}
                    value={exco}
                    onChange={value => setExco(value)}
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
    
    </View>:
  
  <View  
  style={{
                height: RF(300),
                width: '100%',
                backgroundColor: Colors.appWhite,
                justifyContent:'center',
              alignItems:'center'
              }}>
   <TouchableOpacity style={{
      marginBottom:RF(15),
      backgroundColor: '#F2F2F2',
      width: RF(380),
      height:RF(40),
      alignItems:'center',
      flexDirection:'row',
      justifyContent:'space-between',
      paddingHorizontal:RF(20)
    }}
    onPress={() => setNewElectionModal(true)}
    >
      <Image
    style={{ height: 17.5, width: 15,  }}
    source={AppIcons.person}
    resizeMode="contain"
      />
    <P size={RF(13)} color={Colors.appPrimary}>Alvis Charles</P>

    <P size={RF(14)} color={Colors.appPrimary}>Chairman</P>
    </TouchableOpacity>

    <TouchableOpacity style={{
      marginBottom:RF(15),
      backgroundColor: '#F2F2F2',
      width: RF(380),
      height:RF(40),
      alignItems:'center',
      flexDirection:'row',
      justifyContent:'space-between',
      paddingHorizontal:RF(20)
    }}
    onPress={() => setNewElectionModal(true)}
    >
      <Image
    style={{ height: 17.5, width: 15,  }}
    source={AppIcons.person}
    resizeMode="contain"
      />
    <P size={RF(13)} color={Colors.appPrimary}>Alvis Charles</P>

    <P size={RF(14)} color={Colors.appPrimary}>Chairman</P>
    </TouchableOpacity>

    <TouchableOpacity style={{
      marginBottom:RF(15),
      backgroundColor: '#F2F2F2',
      width: RF(380),
      height:RF(40),
      alignItems:'center',
      flexDirection:'row',
      justifyContent:'space-between',
      paddingHorizontal:RF(20)
    }}
    onPress={() => setNewElectionModal(true)}
    >
      <Image
    style={{ height: 17.5, width: 15,  }}
    source={AppIcons.person}
    resizeMode="contain"
      />
    <P size={RF(13)} color={Colors.appPrimary}>Alvis Charles</P>

    <P size={RF(14)} color={Colors.appPrimary}>Chairman</P>
    </TouchableOpacity>
 
  </View>
    
    }


</View>
:



<View style={{paddingHorizontal:'10%', marginTop:'5%',flexDirection:'row', justifyContent:'space-between'}}>
<View style={{
      marginBottom:RF(15),
      backgroundColor: '#F2F2F2',
      width:'70%',
      height:RF(40),
      alignItems:'center',
      flexDirection:'row',
      justifyContent:'space-between',
      paddingHorizontal:RF(20)
    }}
   
    >
  
    <P size={RF(13)} color={Colors.appPrimary}>Alvis Charles</P>
    </View>

<View
 style={{
  marginBottom:RF(15),
  backgroundColor: '#F2F2F2',
  width:'25%',
  height:RF(40),
  alignItems:'center',
  flexDirection:'row',
  justifyContent:'space-between',
  paddingHorizontal:RF(15)
}}
>

<H1 size={RF(18)} color={Colors.appPrimary}>60%</H1>

</View>
</View>





}



    
    </View>    



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
              justifyContent:'center',
            alignItems:'center'
            }}>
 <TouchableOpacity style={{
    marginBottom:RF(15),
    backgroundColor: '#F2F2F2',
    width: RF(320),
    height:RF(40),
    justifyContent:'center',
    paddingLeft:RF(20)
  }}
  onPress={() => setVotingVisible(false)}
  >
  <P size={RF(13)} color={Colors.appPrimary}>Start New Election</P>
  </TouchableOpacity>
  <TouchableOpacity style={{
    marginBottom:RF(15),
    backgroundColor: '#F2F2F2',
    width: RF(320),
    height:RF(40),
    justifyContent:'center',
    paddingLeft:RF(20)
   

  }}>
  <P size={RF(13)} color={Colors.appPrimary}>Ongoing Election</P>
  </TouchableOpacity>
  <TouchableOpacity style={{
    marginBottom:RF(15),
    backgroundColor: '#F2F2F2',
    width: RF(320),
    height:RF(40),
    justifyContent:'center',
    paddingLeft:RF(20)
   

  }}>
  <P size={RF(13)} color={Colors.appPrimary}>End Election</P>
  </TouchableOpacity>
</View>
       
      </Modal>


    </View>
  );
};

export default Payment;
