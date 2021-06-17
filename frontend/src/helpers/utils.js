import moment from 'moment';

export const concatCls = (...args) => args.join(' ');

export const isValidDate = (date) => (new Date(date)).getTime() > 0;

export function formatDate(value, template = 'MMM DD, YYYY HH:mm') {
    if (isValidDate(value)) {
        return moment(value).format(template);
    }

    return value;
}

export function throttle(func, ms) {
    let isThrottled = false;
    let savedArgs;
    let savedThis;

    function wrapper(...args) {
        if (isThrottled) {
            savedArgs = args;
            savedThis = this;
            return;
        }

        func.apply(this, args);

        isThrottled = true;

        setTimeout(() => {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedThis = null;
                savedArgs = null;
            }
        }, ms);
    }

    return wrapper;
}

export const copyTextToClipboard = (() => {
    if (navigator.clipboard) {
        return (text, cb) => {
            navigator.clipboard.writeText(text).then(() => {
                cb(true);
            }, (error) => {
                cb(false, error);
            });
        };
    }
    return (text, cb) => {
        const textarea = document.createElement('textarea');
        let successful = false;

        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
            successful = document.execCommand('copy');
        } catch (error) {} // eslint-disable-line

        document.body.removeChild(textarea);

        if (successful) {
            cb(true);
        } else {
            cb(false);
        }
    };
})();
