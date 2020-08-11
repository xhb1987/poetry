import React, { FC } from 'react';
import { PageView } from 'src/common/component/page-view';
import { StyleSheet } from 'react-native';
import { TextInput } from 'src/common/component/text-input';
import { useForm, Controller } from 'react-hook-form';
import { MyButton } from 'src/common/component/button';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from 'src/state/auth/actions';
import { isEmpty } from 'lodash';
import { selectAuthState } from 'src/state/auth/selectors';
import { useNavigation } from '@react-navigation/native';
import { routes } from 'src/screen/routes';
import { userActions } from 'src/state/user/actions';
import { ErrorMessage } from 'src/common/component/error-message';

type UserRegisterForm = {
  username: string;
  password: string;
  repeatPassword: string;
};

export const RegisterPage: FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuthState);
  const { loading, error } = auth;
  const { control, handleSubmit, getValues } = useForm<UserRegisterForm>();

  const onSubmit = ({ username, password, repeatPassword }: UserRegisterForm) => {
    dispatch(authActions.userRegister(username, password));
  };

  const invalidForm = error || getValues().password !== getValues().repeatPassword;
  const repeatPasswordErrorMessage =
    getValues().password !== getValues().repeatPassword ? '请输入相同的密码' : undefined;
  return (
    <PageView style={{ paddingHorizontal: 8, paddingVertical: 8 }}>
      <Controller
        name="username"
        rules={{ required: true }}
        control={control}
        render={({ onChange, value }) => (
          <TextInput
            placeholder="用户名"
            style={style.input}
            value={value}
            onChangeText={(text: string) => onChange(text)}
          />
        )}
      />
      <Controller
        name="password"
        rules={{ required: true }}
        control={control}
        render={({ onChange, value }) => (
          <TextInput
            secureTextEntry
            textContentType="password"
            placeholder="密码"
            style={style.input}
            value={value}
            onChangeText={(text: string) => onChange(text)}
          />
        )}
      />
      <Controller
        name="repeatPassword"
        rules={{ required: true }}
        control={control}
        render={({ onChange, value }) => (
          <TextInput
            secureTextEntry
            textContentType="password"
            placeholder="再输一次密码"
            style={style.input}
            value={value}
            onChangeText={(text: string) => onChange(text)}
          />
        )}
      />
      <MyButton loading={loading} title="注册" type="primary" onPress={handleSubmit(onSubmit)} />
      {invalidForm && <ErrorMessage message={repeatPasswordErrorMessage} />}
    </PageView>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 6,
  },
  input: {
    display: 'flex',
    // height: 32,
    paddingVertical: 10,
    width: '100%',
    marginVertical: 8,
  },
});
