
    <script>
        document.addEventListener('DOMContentLoaded', () => {

            const shippingData = {
                'pichincha': {
                    'quito': {
                        'carcelen': 6.00,
                        'calderon': 6.50,
                        'centro-historico': 6.00
                    },
                    'ruminahui': {
                        'sangolqui': 6.50
                    },
                    'cayambe': {
                        'cayambe': 7.00
                    }
                },
                'guayas': {
                    'guayaquil': {
                        'guayaquil-centro': 6.00,
                        'guayaquil-sur': 6.50
                    },
                    'duran': {
                        'duran': 6.50
                    },
                    'samborondon': {
                        'samborondon': 7.00
                    }
                }
            };

            const provinceSelect = document.getElementById('province-select');
            const cantonSelect = document.getElementById('canton-select');
            const parishSelect = document.getElementById('parish-select');
            const shippingCostSpan = document.getElementById('shipping-cost');

            function populateSelect(selectElement, data, defaultText) {
                selectElement.innerHTML = `<option value="">${defaultText}</option>`;
                selectElement.disabled = false;
                if (data) {
                    Object.keys(data).forEach(key => {
                        const option = document.createElement('option');
                        option.value = key;
                        option.textContent = key.charAt(0).toUpperCase() + key.slice(1);
                        selectElement.appendChild(option);
                    });
                } else {
                    selectElement.disabled = true;
                }
            }

            function updateShippingCost() {
                let cost = 0;
                const selectedProvince = provinceSelect.value;
                const selectedCanton = cantonSelect.value;
                const selectedParish = parishSelect.value;

                if (selectedProvince && selectedCanton && selectedParish) {
                    cost = shippingData[selectedProvince][selectedCanton][selectedParish];
                }
                shippingCostSpan.textContent = `$${cost.toFixed(2)}`;
            }

            populateSelect(provinceSelect, shippingData, 'Selecciona...');

            provinceSelect.addEventListener('change', () => {
                const selectedProvince = provinceSelect.value;
                const cantons = selectedProvince ? shippingData[selectedProvince] : null;
                populateSelect(cantonSelect, cantons, 'Selecciona un cantón...');
                populateSelect(parishSelect, null, 'Selecciona una parroquia...');
                updateShippingCost();
            });

            cantonSelect.addEventListener('change', () => {
                const selectedProvince = provinceSelect.value;
                const selectedCanton = cantonSelect.value;
                const parishes = (selectedProvince && selectedCanton) ? shippingData[selectedProvince][selectedCanton] : null;
                populateSelect(parishSelect, parishes, 'Selecciona una parroquia...');
                updateShippingCost();
            });

            parishSelect.addEventListener('change', updateShippingCost);
        });
    </script>
</body>
</html>
