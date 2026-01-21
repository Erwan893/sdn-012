/**
 * SD 012 Beringin Jaya - Form Validation
 * Handles Contact Form and PPDB Form validation
 */

document.addEventListener('DOMContentLoaded', () => {

    // ===================================
    // Utility Functions
    // ===================================

    // Show error message
    function showError(input, messageElement, message) {
        input.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500/20');
        input.classList.remove('border-gray-300', 'focus:border-primary', 'focus:ring-primary/20');

        messageElement.textContent = message;
        messageElement.classList.remove('hidden');
    }

    // Show success (valid) state
    function showSuccess(input, messageElement) {
        input.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500/20');
        input.classList.add('border-green-500', 'focus:border-green-500', 'focus:ring-green-500/20');

        messageElement.classList.add('hidden');
    }

    // Validate Email Regex
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Format Phone Number (auto replace 08 with 628 for WhatsApp)
    function formatPhoneNumber(phone) {
        let cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.startsWith('0')) {
            cleanPhone = '62' + cleanPhone.substring(1);
        }
        return cleanPhone;
    }

    // ===================================
    // Contact Form Validation
    // ===================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');

        // Real-time validation
        nameInput.addEventListener('input', () => {
            if (nameInput.value.length < 3) {
                showError(nameInput, document.getElementById('nameError'), 'Nama minimal 3 karakter');
            } else {
                showSuccess(nameInput, document.getElementById('nameError'));
            }
        });

        emailInput.addEventListener('input', () => {
            if (!isValidEmail(emailInput.value)) {
                showError(emailInput, document.getElementById('emailError'), 'Format email tidak valid');
            } else {
                showSuccess(emailInput, document.getElementById('emailError'));
            }
        });

        messageInput.addEventListener('input', () => {
            if (messageInput.value.length < 10) {
                showError(messageInput, document.getElementById('messageError'), 'Pesan terlalu pendek (min. 10 karakter)');
            } else {
                showSuccess(messageInput, document.getElementById('messageError'));
            }
        });

        // Form Submission
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;

            // Validate all fields again
            if (nameInput.value.length < 3) {
                showError(nameInput, document.getElementById('nameError'), 'Nama wajib diisi valid');
                isValid = false;
            }

            if (!isValidEmail(emailInput.value)) {
                showError(emailInput, document.getElementById('emailError'), 'Email wajib diisi valid');
                isValid = false;
            }

            if (messageInput.value.length < 10) {
                showError(messageInput, document.getElementById('messageError'), 'Pesan wajib diisi valid');
                isValid = false;
            }

            if (isValid) {
                // Show success feedback
                const btn = contactForm.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;

                btn.disabled = true;
                btn.innerHTML = '<i data-lucide="check" class="w-5 h-5 mx-auto"></i> Terkirim!';
                lucide.createIcons(); // Re-render icon
                btn.classList.remove('bg-primary');
                btn.classList.add('bg-green-600');

                // Show alert
                alert(`Terima kasih ${nameInput.value}! Pesan Anda telah kami terima.`);

                // Reset form
                contactForm.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.disabled = false;
                    btn.innerHTML = originalText;
                    btn.classList.add('bg-primary');
                    btn.classList.remove('bg-green-600');
                    lucide.createIcons(); // Re-render icons

                    // Reset borders
                    [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
                        input.classList.remove('border-green-500', 'focus:border-green-500', 'focus:ring-green-500/20');
                        input.classList.add('border-gray-300');
                    });
                }, 3000);
            }
        });
    }

    // ===================================
    // PPDB Form Validation
    // ===================================
    const ppdbForm = document.getElementById('ppdbForm');

    if (ppdbForm) {
        ppdbForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get values
            const studentName = document.getElementById('studentName').value;
            const parentPhone = document.getElementById('parentPhone').value;

            if (!studentName || !parentPhone) {
                alert('Mohon lengkapi data siswa dan nomor WhatsApp orang tua.');
                return;
            }

            // Format phone number for WhatsApp
            const waNumber = '6281234567890'; // Replace with School Admin Number
            const message = `Halo Admin SD 012 Beringin Jaya, saya ingin mendaftarkan putra/putri saya:
            
Nama Siswa: ${studentName}
Tanggal Lahir: ${document.getElementById('birthdate').value}
Alamat: ${document.getElementById('address').value}

Nama Ayah: ${document.getElementById('fatherName').value}
Nama Ibu: ${document.getElementById('motherName').value}
Nomor WA: ${parentPhone}

Mohon info selanjutnya. Terima kasih.`;

            // Open WhatsApp
            const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

            // Show confirmation
            if (confirm('Data lengkap! Lanjutkan kirim ke WhatsApp Admin?')) {
                window.open(waUrl, '_blank');
                ppdbForm.reset();
            }
        });
    }
});
