# Panlian [![Build Status](https://img.shields.io/circleci/project/acgotaku/BaiduExporter/master.svg)](https://circleci.com/gh/acgotaku/BaiduExporter/tree/master)

Export Baidu Cloud files address to aria2/aria2-rpc, support YAAW.

## Problem

Baidu Cloud native share method is not persistent and become invalid due to some reasons. A stable solution is acquired.

<img width="973" src="https://raw.githubusercontent.com/logonod/Panlian/master/.github/problem.png">

## Screenshot

<img width="973" src="https://raw.githubusercontent.com/logonod/Panlian/master/.github/home.png">

<img width="973" src="https://raw.githubusercontent.com/logonod/Panlian/master/.github/export.png">

<img width="973" src="https://raw.githubusercontent.com/logonod/Panlian/master/.github/import.png">

## Usage

- Please hover `百度盘链` to see the dropdown menu.
- Import files from `pan://link`:
    - Click `文件导入` when you see dropdown menu
    - Copy `pan://link` to the textarea
    - Click `导入盘链文件` and wait for complete
- Export Baidu Cloud files to `pan://link`
    - Select the file/folder you want to share
    - Hover on `百度盘链` and click `盘链分享`
    - Wait for modal, click `拷贝链接` and send link to your friends

## Install

* Chrome : Click **Settings** -> **Extensions**, drag `Panlian.crx` file to the page, install it, or check **Developer mode** -> **Load unpacked extension**, navigate to the `chrome/release` folder.
* Firefox : Open **about:debugging** in Firefox, click "Load Temporary Add-on" and navigate to the `chrome/release` folder, select `manifest.json`, click OK.
## Contribution

Please make sure to read the [Contributing Guide](https://github.com/logonod/Panlian/blob/master/.github/CONTRIBUTING.md) before making a pull request.

## Hello world

Guess what's in the pan link :wink:

`pan://wpzChMKkcGF0aMOZNcOkwrjCgMOmwovCs0PDpMK6wrovMDEuWyDDpcK-wq7DpMK_wqHDpcKFwqzDpMK8wpfDpcKPwrcgw6fCmsKuxKnCrsOowpnCvsOowrXChMOmwrrCkCBdLm1wNMKuY29udGXFgC1sxYJnxIXDjgvDucK8wofCq8S-xYDFgnQtbWQ1w5kgZDY3MmM5MGNkYWJkMDXFnjIzNzMwYsWaMWU1ZDE1YzDCqXNsaWNlxZPFlcWXNTY5xa85YjM1MTQ5xZ0xxZ8yxbA5NzE4N8WjMWRjNWHEgcSDxIXEh8SJxIvEjcSPxJHEkzLElsSYxJrEnMSexKDEosSkxKbEqMSqxKzErsSwxLLEtMS2xLjEusS8xY_FgcWDxYVuxYdow44MwojCljbFjsS_xrvFksWUxZYgxaM4MjY2NGEwZjE2ZmRlNmPHl2E4xak0YzLFlTPHmDbFt8W5xbvFvceLNzhkxZllxbsyMDM2NTBkxo5iZsWpMjFmOMWiMjI1ZTPGm8SExIbEiMSKxIzEjsSQxJLHtMamxJnEm8SdxJ_EocSjxKXEp8SsxrHEr8SxxLPEtcS3xLnEu8S9x4fFkcWExYbFiAs9blXHhsWQxYPHisWXZGLHtMe3xoY2x77FpGRmYWQ3YTFjOMaYZjc0OMaTZTjHqMW6xbzIsSBmZcWiYsezYzRlMGXHvzNhYzM5NGI5NmHJnMmhx7hlZciIxp3Ii8agyI7GozA0yJLGqMiVxqvImMauyJvEqsayyJ7GtcihxrjIpMivxZLGvca_xYk0BsKRyK7HiMerxZdiNDE3x5o4ZjLJg2E1x6XFoWJix7c4yYpjYseaxaDGiMmMx6rJj8mix5XGmMqUx49hyo7HsTM4yaTHscmGxaTGmTnHuTgxyavIisafyI3GosiQNcmzyJTGqsiXxq3ImsawybrInca0yKDGt8ijxrrIpsqDxYgKwqvDgsONyonIpsmPNsmaZcmgNGbKtjc1NDbHtMiAxo7Iv8miy6FlYmM3xbvKpMmOxb4gMzPIs8mIx5zJmjTLucaIyZHLq8mZxpEwyrDIhcmdyYXKusaeyIzGociPxJM2y4HGqciWxqzImcavxKvLiMazyJ_GtsiixrnIpca8yKjHgArDjhNqy5bIsMuxM8usx7PJpcWzyYbFrMeaxbQ1xarLrMmlyaPFm8i8yIPLr8qLIMmKx7PLnjDKlmPHnMWjxaLFscefyZZiOMqax7fFnmZmzIXJrcq9zIkwN8yMybXLhMyQybnErcuJzJXJvsuNzJnKgsybx4Eqw7TCtMyhx4nLscujyL3GljYzyZTLm2E5x745yrjHj8ujOMWsNsmIxpHHp8W4yY3MtsqTN8aNNsi-yYphyaXHkWY1yppky7TJhcaCZMmgxo7Ni8q8zIjJsDjNkcuDzI_JuMuHzZbMlMm9y4zMmMqByKfGvsWIDcKQCsKdzaLNu8qSNMWrxZwzy500y605yZLJscW1MDI0yrXHkMmCNcy1yY8xMsaEyZHKsDLHnsaHy6rJgMiGx5HHjTPHv82oxbU5zo_Mh8mvyJA5zpTMjsm3y4bMks6ZybzLi8yXyoDKisuQx4AMw6nCrMOxzqbOvMWpx5vKsMaRyYYxzYTIvjTIs8aBxpfKmsu0yprHmGbOu8uxxozFpM2zx6PNrMmFzKRiy6Bhy63MgDHIvcaFzLvPjM-Pya7Kvi_GjM-UybbLhcyRyJzOms-byb_LjsyazqDHgAnCvxnDq8-ly7HIgMqdyZjOtjLFm8WzyZ1lyZFkypLNjzfGlM6FxZnLrs25yqXLscmYyIHGlMmAyo7KuMeuZsehypDNv8e2y6DFtGMxyYHIh8SCyInMhtCMzInRhtCQzZPOl8-YybvLisyW0JfNm86fyoQMP8OzcNCgx4vFscuzyYLHmsml0IHLncqsyL0wxazHlcaOyZ3FosmHxbbQtMuwx4vHm8qWx7_QgWLFs8qXyLs0zrXHsciDx5fNr8eZzrDHsdCLzY3Go8690Y_Ols-X0JTPmtGVzZrOns-fw44Nw64Pw6_RnsWXMMWaz4LJoTXQvsmYypPJmsqYxbLGlM6wypfPrMqQYs-40Z_HuM62y57FqcmUx5Y50p3Jnseay7PFpM2xzazPrDI`

## Issue Notice

Please read [Issue Notice](https://github.com/logonod/Panlian/issues/1)

## Thanks

- BaiduExporter Extension by [acgotaku](https://github.com/acgotaku)
- API by [ly0](https://github.com/ly0)

## Tips

If you don't want to show disable tips every time, please read the post：[Guide on disable Chrome tips](https://hencolle.com/2016/10/16/baidu_exporter/)

## License

![GPLv3](https://www.gnu.org/graphics/gplv3-127x51.png)

Panlian is licensed under [GNU General Public License](https://www.gnu.org/licenses/gpl.html) Version 3 or later.

Panlian is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

Panlian is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with Panlian.  If not, see <http://www.gnu.org/licenses/>.
