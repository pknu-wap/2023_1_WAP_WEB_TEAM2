package com.example.soundspace.api.v1.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

public class UserRequestDto {

    @Getter
    @Setter
    public static class SignUp {

        @NotEmpty(message = "이메일은 필수 입력값입니다.")
        @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$", message = "이메일 형식에 맞지 않습니다.")
        private String email;
        @NotEmpty(message = "아이디는 필수 입력값입니다.")
        @Pattern(regexp = "^[a-z0-9_-]{4,12}$", message = "아이디 형식에 맞지 않습니다.")
        private String username;

        @NotEmpty(message = "비밀번호는 필수 입력값입니다.")
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]{8,16}$", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        private String password;
    }

    @Getter
    @Setter
    public static class Login {
        @NotEmpty(message = "아이디는 필수 입력값입니다.")
        @Pattern(regexp = "^[a-z0-9_-]{4,12}$", message = "아이디 형식에 맞지 않습니다.")
        private String username;

        @NotEmpty(message = "비밀번호는 필수 입력값입니다.")
        private String password;

        public UsernamePasswordAuthenticationToken toAuthentication() {
            return new UsernamePasswordAuthenticationToken(username, password);
        }
    }

    @Getter
    @Setter
    public static class Reissue {
        @NotEmpty(message = "accessToken 을 입력해주세요.")
        private String accessToken;

        @NotEmpty(message = "refreshToken 을 입력해주세요.")
        private String refreshToken;
    }

    @Getter
    @Setter
    public static class Logout {
        @NotEmpty(message = "잘못된 요청입니다.")
        private String accessToken;

        @NotEmpty(message = "잘못된 요청입니다.")
        private String refreshToken;
    }

    @Getter
    @Setter
    public static class Update {
        @NotEmpty(message = "기존 패스워드를 입력해 주세요.")
        private String oldPassword;
        @NotEmpty(message = "새로운 패스워드를 입력해 주세요.")
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]{8,16}$", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        private String newPassword;
    }
}
