export class Toast {
    constructor(type, text, container) {
        this.type = type;
        this.text = text;
        this.container = container;
    }

    toast() {
        const toast = document.createElement("div");
        toast.className = `toast-${this.type} toast`;
        const toastText = document.createElement("div");
        toastText.className = "toast-text";
        toastText.textContent = this.text;
        toast.appendChild(toastText);
        this.container.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 2000);
    }
}
