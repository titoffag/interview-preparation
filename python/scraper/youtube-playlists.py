from selenium import webdriver
from seleniumwire.undetected_chromedriver.v2 import Chrome, ChromeOptions
import time

# one iteration

# nowUrl = "https://www.youtube.com/playlist?list=PLzzbLulr_jcTXaMrqJlm0ULhw5s9S_za3"
# 9
# queryUrl = "https://www.youtube.com/playlist?list=PLzzbLulr_jcQigBY4lizzDElL6ZfagsTt"
# 15
# ulbiTvUrl = "https://www.youtube.com/playlist?list=PLzzbLulr_jcSUoCTeQpG4iVm0LsgR8P0p"
# 9
# twoUrl = "https://www.youtube.com/playlist?list=PLzzbLulr_jcTQUNgfEZOTUAeFonJ9opRD"
# 8
# codeModesUrl = "https://www.youtube.com/playlist?list=PLzzbLulr_jcQRjPgOPYfYG5jh-uscMCsm"
# 59
# goldUrl = "https://www.youtube.com/playlist?list=PLzzbLulr_jcTddi5G_mqhm1keSUEgd6FD"
# 265
# jobTwoUrl = "https://www.youtube.com/playlist?list=PLzzbLulr_jcRec9-8zWy_87-dHwCWTU18"
# 131
# jobThreeUrl = "https://www.youtube.com/playlist?list=PLzzbLulr_jcQT1fBdH0T1SPhHA4JtCq-v"
# 44
# letsGoUrl = "https://www.youtube.com/playlist?list=PLzzbLulr_jcR8gLV5OVtqLvL3co8x8fdu"
# 118
# piterJsUrl = "https://www.youtube.com/playlist?list=PLzzbLulr_jcRS0Yy-xVErX45pixtC8QbR"
# 3
# sleepUrl = "https://www.youtube.com/playlist?list=PLzzbLulr_jcRysQiq6zDOsqTdFWmRYwjc"
# 40
# xTenUrl = "https://www.youtube.com/playlist?list=PLzzbLulr_jcQnlDmWHuHOWqchXcLpNQOg"
# 144
# oneUrl = "https://www.youtube.com/playlist?list=PLzzbLulr_jcSjDXlyRGfQBs5YvbGAXm5C"
# 70
# jobUrl = "https://www.youtube.com/playlist?list=PLzzbLulr_jcR1-MopJsqS-Ca2x3UMPjxb"
# 22
# topUrl = "https://www.youtube.com/playlist?list=PLzzbLulr_jcQdWcoCrc4iJn71WnUvfKwQ"
# # 172

# two iteration

# firebase = "https://www.youtube.com/playlist?list=PL6Mu1AMmTL-sSswsqShJ5fbIr9XjYHGFm"
# # 9
# cracking = "https://www.youtube.com/playlist?list=PLtRFPaw3fD55jjBcBz-mnk673mt9oHe_q"
# # 22
# aug = "https://www.youtube.com/playlist?list=PLzzbLulr_jcRlujzgUt5WGBSr3Nq77v8A"
# # 87
# octFour = "https://www.youtube.com/playlist?list=PLzzbLulr_jcR31_WinGV-8XF9C5EAz0sB"
# # 47
# octFive = "https://www.youtube.com/playlist?list=PLzzbLulr_jcSGHFwjIa19TEuRA2FvjVkg"
# # 13
# july = "https://www.youtube.com/playlist?list=PLzzbLulr_jcTeVONwzwEEcnhpoa0EjOJ1"
# # 25
# octTwenty = "https://www.youtube.com/playlist?list=PLzzbLulr_jcQr-4ObiwxNxjgX7l9ejv4N"
# # 153
# nomad = "https://www.youtube.com/playlist?list=PLqslCF5X7TwxutTUUhdH8aZbKO111RpsR"
# # 13
# k600 = "https://www.youtube.com/playlist?list=PLliXIZ4xbu1LL9kdfuhuok9yMsSE1Iw3e"
# # 9
# relay = "https://www.youtube.com/playlist?list=PLvx8w9g4qv_oIjs-sNY5MX3tcM7Spa8qP"
# # 16
# a11y = "https://www.youtube.com/playlist?list=PLvx8w9g4qv_ofHKccbxESAKqB1M97qcaN"
# # 8
# polyfills = "https://www.youtube.com/playlist?list=PLWaYAVncn8U2IENeL72TzllqUU0LM3ClE"
# # 20
# ast = "https://www.youtube.com/playlist?list=PLw5h0DiJ-9PCWamtYU7X220dlBSU94BdD"
# # 8
# avito = "https://www.youtube.com/playlist?list=PLzzbLulr_jcTXMibVkh7M561k_WilUHVb"
# # 20
# frontJser = "https://www.youtube.com/playlist?list=PLvx8w9g4qv_pZQipuYUyTZNZ3NFTJ9q_9"
# # 8
# bored = "https://www.youtube.com/playlist?list=PLGzpouuZNBOHM-dtgZAkrbhnCo-66ZGWR"
# # 197
# byteGo = "https://www.youtube.com/playlist?list=PLzzbLulr_jcRRSue5oZN8tL3B7t8WZHmX"
# # 42
# codeDemoJser = "https://www.youtube.com/playlist?list=PLvx8w9g4qv_qpIr5byJWIJSRXbq_ZO8M7"
# # 15
# codemodsRC = "https://www.youtube.com/playlist?list=PLUEFvq0deuyUPQwBPLYCDefmNkqMEUe8m"
# # 8
# contractFirst = "https://www.youtube.com/playlist?list=PLTCFnfWaEOP2OgHq7qoe2PENmFDZ0sqBa"
# # 6
# cssBoxShadow = "https://www.youtube.com/playlist?list=PL4-IK0AVhVjPV_GpQj-jAiPP4MrQDoRcM"
# # 3
# cssFun = "https://www.youtube.com/playlist?list=PL4-IK0AVhVjMsgze6_-C9n6UHCA7sJ9OG"
# # 6
# cssFundamentals = "https://www.youtube.com/playlist?list=PL4-IK0AVhVjPRj8P56TtFX2hg33BlbT3x"
# # 21
# cssGrid = "https://www.youtube.com/playlist?list=PL4-IK0AVhVjPv5tfS82UF_iQgFp4Bl998"
# # 15
# designTipsNTricks = "https://www.youtube.com/playlist?list=PL4-IK0AVhVjMuTtgTiNXNddTNkYZeoqU4"
# # 9
# devoops = "https://www.youtube.com/playlist?list=PL-ety8gh7rTpAl_ktlY-3KedVseNmgA8g"
# # 35
# distributedSystemsKaban = "https://www.youtube.com/playlist?list=PLeKd45zvjcDFUEv_ohr_HdUFe97RItdiB"
# # 23
# dockerForNovice = "https://www.youtube.com/playlist?list=PL8X2nqRlWfaYovSn2VgmJ1c-WaUTTVdcW"
# # 32
# flexbox = "https://www.youtube.com/playlist?list=PL4-IK0AVhVjMSb9c06AjRlTpvxL3otpUd"
# # 3
# frontendSystemDesign = "https://www.youtube.com/playlist?list=PLI9W87-Dqn7j_x6QtR6sUjycJR7nQLBqT"
# # 12
# frontendCrewPodlodka = "https://www.youtube.com/playlist?list=PLNSmyatBJig6ciyZ8A8zU0ZCngZxj858X"
# # 19
# solid = "https://www.youtube.com/playlist?list=PLz_dGYmQRrr8rWKkoB3BtxF7JpCzUKny_"
# # 5
# gephi = "https://www.youtube.com/playlist?list=PLk_jmmkw5S2BqnYBqF2VNPcszY93-ze49"
# # 11
# gpt = "https://www.youtube.com/playlist?list=PLzzbLulr_jcQaKL29xtr0g2S1yMAIWVUy"
# # 122
# gridTipsNTricks = "https://www.youtube.com/playlist?list=PL4-IK0AVhVjOSNeNSB0hAVMmRB102o47u"
# # 6
# cssFun = "https://www.youtube.com/playlist?list=PL4-IK0AVhVjMI45H5E9oE47wj-7AZLNnK"
# # 37
# hitman = "https://www.youtube.com/playlist?list=PLejGw9J2xE9Vm8t1ZGczwkqLB_t22pNc4"
# # 7
# holyJs23Spring = "https://www.youtube.com/playlist?list=PL8sJahqnzh8KEVndDIw0QPGUGugVtV3NJ"
# # 53
# sentry = "https://www.youtube.com/playlist?list=PLOwEowqdeNMr7wwxSeUChfvxkcvOD4PhW"
# # 28
# htmlNCssConcepts = "https://www.youtube.com/playlist?list=PL4-IK0AVhVjP27yZLwW-gkPggRps0CCnP"
# # 28
# kafka = "https://www.youtube.com/playlist?list=PL8D2P0ruohOC5FXjzqVRaTsglQ57iKCCe"
# # 10
# kmm = "https://www.youtube.com/playlist?list=PLzzbLulr_jcStk7B6ZFzOAVSAIM6MdZY2"
# # 61
# k8s = "https://www.youtube.com/playlist?list=PLUg-pCpAMNlWgGsYd0HsxGXCpQQ13MQ9p"
# # 10
# k8s2 = "https://www.youtube.com/playlist?list=PL3SzV1_k2H1VDePbSWUqERqlBXIk02wCQ"
# # 49
# moduleFederation = "https://www.youtube.com/playlist?list=PLNqp92_EXZBLr7p7hn6IYa1YPNs4yJ1t1"
# # 30
# moduleFederation2 = "https://www.youtube.com/playlist?list=PLWSiF9YHHK-DqsFHGYbeAMwbd9xcZbEWJ"
# # 57
# menu = "https://www.youtube.com/playlist?list=PL4-IK0AVhVjPxtv9SVKQZm_huHpDEgLz0"
# # 8
# nestNNxMonoRepo = "https://www.youtube.com/playlist?list=PLIGDNOJWiL1-zscX224pibRBb4RChTpgM"
# # 17
# nextJs = "https://www.youtube.com/playlist?list=PLNkWIWHIRwMHjz7hM5o10BNc6dq0OMd2U"
# # 13
# nextJs2 = "https://www.youtube.com/playlist?list=PLC3y8-rFHvwgC9mj0qv972IO5DmD-H0ZH"
# # 79
# nextJs3 = "https://www.youtube.com/playlist?list=PLtL3lrXPn2rUQtW3A4kXbYY21frev-iDw"
# # 15
# openApi = "https://www.youtube.com/playlist?list=PL4MpKy3QjNp8IsepABrb_c6D867DFO6aR"
# # 7
# openShift = "https://www.youtube.com/playlist?list=PL2We04F3Y_43DDcvM1bAxF7YIPglrMdif"
# # 11
# purpleSchool = "https://www.youtube.com/playlist?list=PLzzbLulr_jcT7ZJumpnB6ng8y09UkoPP7"
# # 6
# reactBoston = "https://www.youtube.com/playlist?list=PLhBlV3WSUrT26VEZXlNdEIMQ3h3zKOtaj"
# # 18
# reactInternalsJser = "https://www.youtube.com/playlist?list=PLvx8w9g4qv_p-OS-XdbB3Ux_6DMXhAJC3"
# # 37
# reactUnderTheHood = "https://www.youtube.com/playlist?list=PLz_dGYmQRrr-g02jHDzuu-6VlOt8-8Uu5"
# # 29
# redux = "https://www.youtube.com/playlist?list=PLz_dGYmQRrr_anPUDStuGOMFzogyYtsGZ"
# # 6
# responsiveCss = "https://www.youtube.com/playlist?list=PL4-IK0AVhVjODqX-gN6KH68Tt_zrYiTwA"
# # 13
# responsiveLayout = "https://www.youtube.com/playlist?list=PL4-IK0AVhVjM6kuUoUexfmnD8vHtZkXdd"
# # 5
# siberia = "https://www.youtube.com/playlist?list=PLzzbLulr_jcRLbJux-FQEf9NKqBFYTrA3"
# # 5
# solidityNEtherium = "https://www.youtube.com/playlist?list=PLWlFXymvoaJ92awHVDO0oSy0z0ZFJifDV"
# # 83
# solutinsKevinPowell = "https://www.youtube.com/playlist?list=PL4-IK0AVhVjMbyomzxwNOECQwioJLxX6n"
# # 7
# strangeCssBehaviors = "https://www.youtube.com/playlist?list=PL4-IK0AVhVjMdy1JNSpL-_4UnDmY2MpDm"
# # 4
# subGrid = "https://www.youtube.com/playlist?list=PL4-IK0AVhVjM4Kjqw_zN-Y3neCFXWPDJ2"
# # 5
# teamLeadTalks = "https://www.youtube.com/playlist?list=PLHaA0HZVBgw0eWyWQqdIcxj0jcqaUJzEw"
# # 26
# tinkoffLectoryLectures = "https://www.youtube.com/playlist?list=PL4_hYwCyhAvaYKF6HkyCximCvlExxxnrC"
# # 18
# tinkoffLectorySeminars = "https://www.youtube.com/playlist?list=PL4_hYwCyhAvZd6B5fN3yAB0zOCjhgpfgg"
# # 9
# cssFuture = "https://www.youtube.com/playlist?list=PL4-IK0AVhVjN6Utu26iRBgKjjfkAzA3HS"
# # 6
# hiddenCssGems = "https://www.youtube.com/playlist?list=PL4-IK0AVhVjNECnxtbh5Ut-7tj-m2Z9tX"
# # 7

# two iteration

# sinkingCity = "https://www.youtube.com/playlist?list=PLejGw9J2xE9Uhi8l0AXqQmxVFewcTgd83"
# # 23
# traveling = "https://www.youtube.com/playlist?list=PLzzbLulr_jcTaTVSD4MZT_w_nd_4VGlNr"
# # 38
# astTs = "https://www.youtube.com/playlist?list=PLw5h0DiJ-9PCwNSeCASqOztHHND8pJmAp"
# # 7
# tsDeepDive = "https://www.youtube.com/playlist?list=PLvx8w9g4qv_qCRPoeWGPMCJ0U8ArN23DI"
# # 26
# uiTricks = "https://www.youtube.com/playlist?list=PLz_dGYmQRrr_zIHMTnu9ocML1KeqzHXKB"
# # 5
# cssUnderstanding = "https://www.youtube.com/playlist?list=PL4-IK0AVhVjN2zxuVfQgw7hjUtNenPwqI"
# # 4
# htmlUnderstanding = "https://www.youtube.com/playlist?list=PL4-IK0AVhVjOquwY5m3R3KFIEYW2sZEl5"
# # 3
# cssShorthands = "https://www.youtube.com/playlist?list=PL4-IK0AVhVjPoBEaH9cwlUiAfzGtOPmA0"
# # 3
# webApi = "https://www.youtube.com/playlist?list=PLvx8w9g4qv_pDabDJ6QVQpN5ZQCyG9FaV"
# # 9
# webTypography = "https://www.youtube.com/playlist?list=PL4-IK0AVhVjO-nkUzP3wWoOXBB9UP2UhU"
# # 4
# okr = "https://www.youtube.com/playlist?list=PLSBxSiKmqWIDL_ZunjVPH_cTn7z3_BP3X"
# # 17
# k8sSlerm = "https://www.youtube.com/playlist?list=PL8D2P0ruohOA4Y9LQoTttfSgsRwUGWpu6"
# # 25
# desing = "https://www.youtube.com/playlist?list=PLrb-EzKMlGiz8pExqZ83Yyki2LyVAmekM"
# # 7
# sberTech = "https://www.youtube.com/playlist?list=PLOLysiZ_IMc0SXiyLK_fRETYNCR3uN05h"
# 13
# infraAsCode = "https://www.youtube.com/playlist?list=PLGQiJX6wM-zz5xbRH_RnQu5SSVyFf0Ftc"
# # 9
# frontParomov = "https://www.youtube.com/playlist?list=PLMlifxDLpB1A1PBUuokemDQPi82aY9Iaj"
# # 2
# reactConcepts = "https://www.youtube.com/playlist?list=PLMlifxDLpB1BgOvomOm6ByV9Jn0LziWyx"
# # 13
# mitCrypto = "https://www.youtube.com/playlist?list=PLDTlYmDW7oIgx1WrpkEAkrQVF-hvdConK"
# # 23
# ciCdDeusOps = "https://www.youtube.com/playlist?list=PLGQiJX6wM-zzEcA_0Wn3SIL8MyammjqSH"
# # 13
# deusOpsCourse = "https://www.youtube.com/playlist?list=PLGQiJX6wM-zzcPye1y7gpyJO0uH7NMNP7"
# # 22
# teamLeadAndSysDesign = "https://www.youtube.com/playlist?list=PLzzbLulr_jcQJvDqnDJ6OzisQq7E3vayj"
# 87
# noCourse = "https://www.youtube.com/playlist?list=PLMlifxDLpB1DIgw46QRPOU0C8RwmCUaxl"
# 26
# virtualizationCourse = "https://www.youtube.com/playlist?list=PLcDkQ2Au8aVM6hSTeiBGTXNMNBwzQyuZG"
# # 15
# bukichNetworkingSoftSkills = "https://www.youtube.com/playlist?list=PL_tsJNl32BlO91oMRiay3KwMLwEaCF62f"
# # 25
# reactApi = "https://www.youtube.com/playlist?list=PLMlifxDLpB1CtPC6YZjYoLZY7GZvMkQS3"
# # 3
# golang = "https://www.youtube.com/playlist?list=PLbTTxxr-hMmxZMXsvaE-PozXxktdJ5zLR"
# # 36
# sokol = "https://www.youtube.com/playlist?list=PLzzbLulr_jcSoZT13ljN_Llt8bhL_vhVh"
# # 84
# starupProcesses = "https://www.youtube.com/playlist?list=PLbTTxxr-hMmz3PLYcyWri2W6o-YyAONxY"
# 10

watchLaterUrl = "https://www.youtube.com/playlist?list=WL"
# 2751
# devOops = "https://www.youtube.com/playlist?list=PL-ety8gh7rTpAl_ktlY-3KedVseNmgA8g"
# # 35
# restApiGolang = "https://www.youtube.com/playlist?list=PLbTTxxr-hMmyFAvyn7DeOgNRN8BQdjFm8"
# # 13
# backendGolang = "https://www.youtube.com/playlist?list=PLbTTxxr-hMmzdP4nCix9KnFIRo-Dvfjkt"
# # 16
# tgBotGolang = "https://www.youtube.com/playlist?list=PLbTTxxr-hMmzSGTsO5mdYLrvKY-RZFanp"
# # 8

urlName: list[str] = [
    'watchLaterUrl',
    # 'devOops',
    # 'restApiGolang',
    # 'backendGolang',
    # 'tgBotGolang',

    # 'sinkingCity',
    # 'traveling',
    # 'astTs',
    # 'tsDeepDive',
    # 'uiTricks',
    # 'cssUnderstanding',
    # 'htmlUnderstanding',
    # 'cssShorthands',
    # 'webApi',
    # 'webTypography',
    # 'okr',
    # 'k8sSlerm',
    # 'desing',
    # 'sberTech',
    # 'infraAsCode',
    # 'frontParomov',
    # 'reactConcepts',
    # 'mitCrypto',
    # 'ciCdDeusOps',
    # 'deusOpsCourse',
    # 'teamLeadAndSysDesign',
    # 'noCourse',
    # 'virtualizationCourse',
    # 'bukichNetworkingSoftSkills',
    # 'reactApi',
    # 'golang',
    # 'sokol',
    # 'starupProcesses',

    # 'firebase',
    # 'cracking',
    # 'aug',
    # 'octFour',
    # 'octFive',
    # 'july',
    # 'octTwenty',
    # 'nomad',
    # 'k600',
    # 'relay',
    # 'a11y',
    # 'polyfills',
    # 'ast',
    # 'avito',
    # 'frontJser',
    # 'bored',
    # 'byteGo',
    # 'codeDemoJser',
    # 'codemodsRC',
    # 'contractFirst',
    # 'cssBoxShadow',
    # 'cssFun',
    # 'cssFundamentals',
    # 'cssGrid',
    # 'designTipsNTricks',
    # 'devoops',
    # 'distributedSystemsKaban',
    # 'dockerForNovice',
    # 'flexbox',
    # 'frontendSystemDesign',
    # 'frontendCrewPodlodka',
    # 'solid',
    # 'gephi',
    # 'gpt',
    # 'gridTipsNTricks',
    # 'cssFun',
    # 'hitman',
    # 'holyJs23Spring',
    # 'sentry',
    # 'htmlNCssConcepts',
    # 'kafka',
    # 'kmm',
    # 'k8s',
    # 'k8s2',
    # 'moduleFederation',
    # 'moduleFederation2',
    # 'menu',
    # 'nestNNxMonoRepo',
    # 'nextJs',
    # 'nextJs2',
    # 'nextJs3',
    # 'openApi',
    # 'openShift',
    # 'purpleSchool',
    # 'reactBoston',
    # 'reactInternalsJser',
    # 'reactUnderTheHood',
    # 'redux',
    # 'responsiveCss',
    # 'responsiveLayout',
    # 'siberia',
    # 'solidityNEtherium',
    # 'solutinsKevinPowell',
    # 'strangeCssBehaviors',
    # 'subGrid',
    # 'teamLeadTalks',
    # 'tinkoffLectoryLectures',
    # 'tinkoffLectorySeminars',
    # 'cssFuture',
    # 'hiddenCssGems',

    # 'now',
    # 'query',
    # 'ulbiTv',
    # 'two',
    # 'codeModes',
    # 'gold',
    # 'jobTwo',
    # 'jobThree',
    # 'letsGo',
    # 'piterJs',
    # 'sleep',
    # 'xTen',
    # 'one',
    # 'job',
    # 'top'
]

urls: list[str] = [
    watchLaterUrl,
    # devOops,
    # restApiGolang,
    # backendGolang,
    # tgBotGolang,

    # sinkingCity,
    # traveling,
    # astTs,
    # tsDeepDive,
    # uiTricks,
    # cssUnderstanding,
    # htmlUnderstanding,
    # cssShorthands,
    # webApi,
    # webTypography,
    # okr,
    # k8sSlerm,
    # desing,
    # sberTech,
    # infraAsCode,
    # frontParomov,
    # reactConcepts,
    # mitCrypto,
    # ciCdDeusOps,
    # deusOpsCourse,
    # teamLeadAndSysDesign,
    # noCourse,
    # virtualizationCourse,
    # bukichNetworkingSoftSkills,
    # reactApi,
    # golang,
    # sokol,
    # starupProcesses,

    # two iteration

    # firebase,
    # cracking,
    # aug,
    # octFour,
    # octFive,
    # july,
    # octTwenty,
    # nomad,
    # k600,
    # relay,
    # a11y,
    # polyfills,
    # ast,
    # avito,
    # frontJser,
    # bored,
    # byteGo,
    # codeDemoJser,
    # codemodsRC,
    # contractFirst,
    # cssBoxShadow,
    # cssFun,
    # cssFundamentals,
    # cssGrid,
    # designTipsNTricks,
    # devoops,
    # distributedSystemsKaban,
    # dockerForNovice,
    # flexbox,
    # frontendSystemDesign,
    # frontendCrewPodlodka,
    # solid,
    # gephi,
    # gpt,
    # gridTipsNTricks,
    # cssFun,
    # hitman,
    # holyJs23Spring,
    # sentry,
    # htmlNCssConcepts,
    # kafka,
    # kmm,
    # k8s,
    # k8s2,
    # moduleFederation,
    # moduleFederation2,
    # menu,
    # nestNNxMonoRepo,
    # nextJs,
    # nextJs2,
    # nextJs3,
    # openApi,
    # openShift,
    # purpleSchool,
    # reactBoston,
    # reactInternalsJser,
    # reactUnderTheHood,
    # redux,
    # responsiveCss,
    # responsiveLayout,
    # siberia,
    # solidityNEtherium,
    # solutinsKevinPowell,
    # strangeCssBehaviors,
    # subGrid,
    # teamLeadTalks,
    # tinkoffLectoryLectures,
    # tinkoffLectorySeminars,
    # cssFuture,
    # hiddenCssGems,

    # one iteration

    # nowUrl,
    # queryUrl,
    # ulbiTvUrl,
    # twoUrl,
    # codeModesUrl,
    # goldUrl,
    # jobTwoUrl,
    # jobThreeUrl,
    # letsGoUrl,
    # piterJsUrl,
    # sleepUrl,
    # xTenUrl,
    # oneUrl,
    # jobUrl,
    # topUrl
]


options = {}
chrome_options = ChromeOptions()
chrome_options.add_argument('--user-data-dir=hash')
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--incognito")
chrome_options.add_argument("--disable-dev-shm-usage")

driver = Chrome(seleniumwire_options=options, options=chrome_options)
driver.get(url="https://youtube.com")  # put here your link
time.sleep(30)

for i, url in enumerate(iterable=urls):
    driver.get(url=url)  # put here your link
    time.sleep(5)

    # scroll page down
    old_position = 0
    new_position = None
    position_script = """return (window.pageYOffset !== undefined) ?
            window.pageYOffset : (document.documentElement ||
            document.body.parentNode || document.body);"""
    while new_position != old_position:
        old_position = driver.execute_script(script=position_script)
        time.sleep(1)
        driver.execute_script(
            script="""var scrollingElement = (document.scrollingElement ||
            document.body);scrollingElement.scrollTop =
            scrollingElement.scrollHeight;""")
        new_position = driver.execute_script(script=position_script)

    source_page: str = driver.page_source
    driver.quit()
    # Open the file in write mode ('w')
    with open(f'{urlName[i]}.txt', 'w') as f:
        # extract the url's and name's
        counter = 1
        element_to_find = 'amp;index={}'
        video_index: int = source_page.find(element_to_find.format(counter))  #'amp;index=1" ar'
        while video_index != -1:
            title_element = ''
            count_name: int = video_index
            while title_element != 'title="':
                title_element: str = source_page[count_name: count_name + 7]
                count_name += 1
            count_name += 6
            start_title_position: int = count_name
            end_title = ''
            while end_title != '>':
                end_title: str = source_page[count_name]  # exit loop if end_title == '>'
                count_name += 1
            name: str = source_page[start_title_position:count_name - 2]  # extract the name of the video
            name = name.replace('&quot;','"')
            video_id = source_page[video_index - 56: video_index - 45]  # extract video id
            # Write to the file instead of printing
            f.write(str(counter)
                + '. link: ' + 'https://www.youtube.com/watch?v=' + video_id +
                ', name: ' + name + '\n')
            counter += 1
            video_index = source_page.find(element_to_find.format(counter))  # continue the next video
