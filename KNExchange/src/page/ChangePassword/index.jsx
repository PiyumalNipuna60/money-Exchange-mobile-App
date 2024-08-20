import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextField from '../../common/TextField/TextField';
import CommonButton from '../../common/CommonButton/CommonButton';
import {getData} from '../../utils/storage/Storage';
import instance from '../../services/Axious';
import Toast from 'react-native-toast-message';
import {Modal, Button, Dialog, Portal, PaperProvider} from 'react-native-paper';

export default function ChangePassword({
  visible = false,
  onClose,
  navigation,
  partner,
  changeRole = 'Admin',
}) {
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordView, setIsPasswordView] = useState(false);
  const [isRePasswordView, setIsRePasswordView] = useState(false);
  const [role, setRole] = useState('');

  const isValid = reEnterPassword && newPassword && isPasswordValid;

  const showToast = (val1, val2) => {
    Toast.show({
      type: 'error',
      text1: val1,
      text2: val2,
      text2Style: {fontSize: 17, fontFamily: 'Dosis-Regular'},
      text1Style: {fontSize: 15},
    });
  };

  const ChangePassword = async () => {
    if (newPassword === reEnterPassword) {
      if (changeRole === 'Admin') {
        try {
          const adminDetails = await instance.post(
            'user/get_user_info_by_token',
            {role: 'Admin'},
          );

          const updateDetails = {
            employeeId: adminDetails.data?.employeeId,
            fistName: adminDetails.data?.fistName,
            lastName: adminDetails.data?.lastName,
            address: adminDetails.data?.address,
            contact: adminDetails.data?.contact,
            nic: adminDetails.data?.nic,
            country: adminDetails.data?.country,
            role: adminDetails.data?.role,
            userName: adminDetails.data?.userName,
            password: newPassword,
          };

          instance
            .put(`user/update/${adminDetails.data?.employeeId}`, updateDetails)
            .then(function (response) {
              console.log('success');
              onClose();
            });
        } catch (error) {
          console.log(error);
        }
      } else if (changeRole === 'AdminPartner') {
        const updateDetails = {
          employeeId: partner?.employeeId,
          fistName: partner?.fistName,
          lastName: partner.data?.lastName,
          address: partner?.address,
          contact: partner?.contact,
          nic: partner?.nic,
          country: partner?.country,
          role: partner?.role,
          userName: partner?.userName,
          password: newPassword,
        };

        instance
          .put(`user/update/${partner?.employeeId}`, updateDetails)
          .then(function (response) {
            onClose();
          });
      } else if (changeRole === 'Runner') {
        const updateDetails = {
          name: partner.name,
          address: partner.address,
          contact: partner.contact,
          nic: partner.nic,
          country: partner.country,
          userName: partner.userName,
          password: newPassword,
          employeeId: partner.employee.employeeId,
        };

        instance
          .put(`runner/${partner?.runnerId}`, updateDetails)
          .then(function (response) {
            console.log('success');
            onClose();
          });
      }
    } else {
      showToast('Error', 'Passwords Not Match');
    }
  };

  useEffect(() => {}, []);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={{
          backgroundColor: '#d5f0f5',
          padding: 4,
          height: '100%',
        }}>
        <View style={{flex: 1}}>
          <View style={{height: '12%', padding: 12}}>
            <View style={{marginBottom: 2}}>
              <TouchableOpacity
                onPress={() => {
                  onClose();
                }}>
                <Ionicons name="return-up-back" size={30} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.titleContainer}>
              <Text style={styles.title}>Change Password</Text>
            </View>
          </View>

          <View
            style={{
              height: '86%',
              backgroundColor: '#ffffff',
              borderRadius: 12,
              margin: '2%',
              paddingTop: 15,
            }}>
            <View style={styles.fieldContainer}>
              <KeyboardAwareScrollView keyboardShouldPersistTaps={'never'}>
                <View style={{margin: 4, marginTop: 25}}>
                  <Text style={styles.smallText}>New Password</Text>
                </View>

                <View style={{margin: 4}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: isPasswordValid ? '#3e92e6' : '#a80c19',
                      paddingRight: 5,
                      borderRadius: 7,
                    }}>
                    <View style={{flex: 1}}>
                      <TextField
                        //value={}
                        type={isPasswordView ? 'Text' : 'password'}
                        bdrWidth={0}
                        onChange={val => {
                          const regex = /^(?=.*[A-Z]).{5,}$/;
                          if (regex.test(val)) {
                            setIsPasswordValid(true);
                          } else {
                            setIsPasswordValid(false);
                          }

                          setNewPassword(val);
                        }}
                      />
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        if (isPasswordView) {
                          setIsPasswordView(false);
                        } else {
                          setIsPasswordView(true);
                        }
                      }}>
                      {isPasswordView ? (
                        <Ionicons name="eye-outline" size={30} color="#ccc" />
                      ) : (
                        <Ionicons
                          name="eye-off-outline"
                          size={30}
                          color="#ccc"
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.extraSmallText}>
                    {' '}
                    * Minimum 5 charactors with capital letter
                  </Text>
                </View>

                <View style={{margin: 4}}>
                  <Text style={styles.smallText}>Re Enter Password</Text>
                </View>

                <View style={{margin: 4}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: '#ccc',
                      paddingRight: 5,
                      borderRadius: 7,
                    }}>
                    <View style={{flex: 1}}>
                      <TextField
                        //value={}
                        type={isRePasswordView ? 'Text' : 'password'}
                        bdrWidth={0}
                        onChange={val => {
                          setReEnterPassword(val);
                        }}
                      />
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        if (isRePasswordView) {
                          setIsRePasswordView(false);
                        } else {
                          setIsRePasswordView(true);
                        }
                      }}>
                      {isRePasswordView ? (
                        <Ionicons name="eye-outline" size={30} color="#ccc" />
                      ) : (
                        <Ionicons
                          name="eye-off-outline"
                          size={30}
                          color="#ccc"
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{margin: 4}}>
                  <CommonButton
                    style={styles.btn}
                    label={'Save'}
                    onPress={ChangePassword}
                    disabled={!isValid}
                  />
                </View>
              </KeyboardAwareScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingRight: 5,
    borderRadius: 7,
  },

  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#1d86f0',
    fontSize: 26,
    textAlign: 'left',
    fontFamily: 'Dosis-Bold',
  },
  fieldName: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  fieldContainer: {
    marginHorizontal: 8,
  },
  btn: {
    borderRadius: 7,
    width: '100%',
    height: 50,
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 10,
  },
  listSenderName: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },

  smallText: {
    fontSize: 18,
    fontFamily: 'Dosis-Regular',
    color: '#a5a6a8',
  },
  extraSmallText: {
    fontSize: 13,
    fontFamily: 'Dosis-Regular',
    color: '#a5a6a8',
  },
});
