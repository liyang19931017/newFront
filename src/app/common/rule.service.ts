export const ruleConfig = {
    phoneRule: /^[1][3,4,5,7,8][0-9]{9}$/,
    emailRule: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
    validatePassword: function (value) {
        if (value) {
            var regUpper = /[A-Z]/;
            var regLower = /[a-z]/;
            var regNum = /[0-9]/;
            var regTeShu = new RegExp("[`~!@#$^&*%()=|{}';',\\[\\].<>/?~！@#&*|{}‘；：'，、+-]");
            var complex = 0;
            if (regLower.test(value)) {
                ++complex;
            }
            if (regUpper.test(value)) {
                ++complex;
            }
            if (regNum.test(value)) {
                ++complex;
            }
            if (regTeShu.test(value)) {
                ++complex;
            }
            if (complex < 4 || value.length < 8) {
                return false;
            } else {
                return true;
            }
        }
    },
    httpRule:/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/,
    register:/^[0-9a-zA-Z]+$/,
    integer:/^[1-9]\d*$/
};
