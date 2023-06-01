package com.example.soundspace.api.v1.controller;

import com.example.soundspace.api.lib.Helper;
import com.example.soundspace.api.v1.dto.Response;
import com.example.soundspace.api.v1.dto.request.UserRequestDto;
import com.example.soundspace.api.v1.service.UsersService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@RestController
public class UsersController {

    private final UsersService usersService;
    private final Response response;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@Validated UserRequestDto.SignUp signUp,
                                    @ApiIgnore Errors errors) {
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }
        return usersService.signUp(signUp);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Validated UserRequestDto.Login login,
                                   @ApiIgnore Errors errors) {
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }
        return usersService.login(login);
    }

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(@Validated UserRequestDto.Reissue reissue,
                                     @ApiIgnore Errors errors) {
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }
        return usersService.reissue(reissue);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@Validated UserRequestDto.Logout logout, @ApiIgnore Errors errors) {
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }
        return usersService.logout(logout);
    }

    @GetMapping("/authority")
    public ResponseEntity<?> authority() {
        log.info("ADD ROLE_ADMIN");
        return usersService.authority();
    }

    @GetMapping("/userTest")
    public ResponseEntity<?> userTest() {
        log.info("ROLE_USER");
        return response.success();
    }

    @GetMapping("/adminTest")
    public ResponseEntity<?> adminTest() {
        log.info("ROLE_ADMIN TEST");
        return response.success();
    }

    @PatchMapping("/{username}")
    public ResponseEntity<?> update(@PathVariable String username, @Validated @RequestBody UserRequestDto.Update update, @ApiIgnore Errors errors) {
        if (errors.hasErrors()) {
            return response.invalidFields(Helper.refineErrors(errors));
        }
        return usersService.updateUser(username, update);
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> profiles(@PathVariable String username) {
        return usersService.profiles(username);
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(String query) {
        return usersService.search(query);
    }
}
