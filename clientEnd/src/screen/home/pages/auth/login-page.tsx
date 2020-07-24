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
import MyText from 'src/common/component/text';
import { ErrorMessage } from 'src/common/component/error-message';

type UserLoginForm = {
  username: string;
  password: string;
};

export const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuthState);

  const { loading, error } = auth;
  const { control, handleSubmit, errors } = useForm<UserLoginForm>();
  const onSubmit = ({ username, password }: UserLoginForm) => {
    if (isEmpty(errors)) {
      dispatch(authActions.userLogin(username, password));
    }
  };
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
      <MyButton loading={loading} title="登录" type="primary" onPress={handleSubmit(onSubmit)} />
      {error && <ErrorMessage />}
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
