-- Insert categories
INSERT INTO categories (name_fa, name_en, slug, icon, description, sort_order) VALUES
('هنذفری و هدست', 'Headphones & Headset', 'headphones', 'headphones', 'بی‌سیم، نویزکنسلینگ، گیمینگ', 1),
('ساعت هوشمند', 'Smartwatch', 'smartwatch', 'watch', 'اندروید و iOS، سنسور سلامتی', 2),
('شارژر', 'Chargers', 'chargers', 'zap', 'دیواری، فندکی، پاوربانک', 3),
('فلش و کارت حافظه', 'Flash & Memory Card', 'storage', 'hard-drive', 'تا ۱ ترابایت، سرعت بالا', 4),
('کابل شارژ', 'Cables', 'cables', 'cable', 'تایپ‌سی، لایتنینگ، میکرو', 5);

-- Insert bestseller products
INSERT INTO products (name_fa, name_en, slug, category_id, price, original_price, image_url, description, is_bestseller, is_new, rating, sort_order) VALUES
('هنذفری بلوتوثی انکر Soundcore R50i NC', 'Anker Soundcore R50i NC', 'anker-r50i-nc', (SELECT id FROM categories WHERE slug='headphones'), 1890000, 2400000, 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400', 'نویزکنسلینگ فعال، صدای استریو', true, false, 4.5, 1),
('هنذفری بلوتوثی انکر Soundcore R50i A3949', 'Anker Soundcore R50i A3949', 'anker-r50i-a3949', (SELECT id FROM categories WHERE slug='headphones'), 1650000, 2100000, 'https://images.pexels.com/photos/3874338/pexels-photo-3874338.jpeg?auto=compress&cs=tinysrgb&w=400', 'طراحی کامپکت، باتری قوی', true, false, 4.3, 2),
('هنذفری بلوتوثی انکر Soundcore Liberty 4 NC', 'Anker Soundcore Liberty 4 NC', 'anker-liberty-4-nc', (SELECT id FROM categories WHERE slug='headphones'), 3490000, 4200000, 'https://images.pexels.com/photos/3786385/pexels-photo-3786385.jpeg?auto=compress&cs=tinysrgb&w=400', 'Hi-Res Audio، LDAC، ANC 2.0', true, false, 4.7, 3),
('هنذفری بلوتوثی ایربادز شیائومی QCY T13X', 'QCY T13X Earbuds', 'qcy-t13x', (SELECT id FROM categories WHERE slug='headphones'), 890000, 1200000, 'https://images.pexels.com/photos/5777636/pexels-photo-5777636.jpeg?auto=compress&cs=tinysrgb&w=400', 'ایربادز اقتصادی، کیفیت بالا', true, false, 4.1, 4),
('چندراهی برق و شارژ گرین لاین Power Strip', 'Green Lion Power Strip', 'greenlion-power-strip', (SELECT id FROM categories WHERE slug='chargers'), 680000, 850000, 'https://images.pexels.com/photos/45241/tower-plug-socket-electricity-45241.jpeg?auto=compress&cs=tinysrgb&w=400', 'توان ۲۵۰۰ وات، چند پورت', true, false, 4.2, 5),
('تبدیل ۳ به ۲ تایمردار گرین لاین', 'Green Lion Universal Conversion', 'greenlion-converter', (SELECT id FROM categories WHERE slug='chargers'), 520000, 680000, 'https://images.pexels.com/photos/26493657/pexels-photo-26493657.jpeg?auto=compress&cs=tinysrgb&w=400', 'تایمر هوشمند، محافظ برق', true, false, 4.0, 6),
('مبدل برق هادرون مدل A08', 'Hadron A08 Adapter', 'hadron-a08', (SELECT id FROM categories WHERE slug='chargers'), 180000, 250000, 'https://images.pexels.com/photos/26493657/pexels-photo-26493657.jpeg?auto=compress&cs=tinysrgb&w=400', '۳ به ۲، کامپکت', true, false, 3.9, 7),
('مبدل برق ۳ به ۲ هادرون مدل A10E', 'Hadron A10E Adapter', 'hadron-a10e', (SELECT id FROM categories WHERE slug='chargers'), 200000, 280000, 'https://images.pexels.com/photos/26493657/pexels-photo-26493657.jpeg?auto=compress&cs=tinysrgb&w=400', 'طراحی مینیمال، دوشاخه استاندارد', true, false, 4.0, 8);

-- Insert newer products
INSERT INTO products (name_fa, name_en, slug, category_id, price, original_price, image_url, description, is_bestseller, is_new, rating, sort_order) VALUES
('ساعت هوشمند شیائومی Mi Band 8', 'Xiaomi Mi Band 8', 'xiaomi-mi-band-8', (SELECT id FROM categories WHERE slug='smartwatch'), 1590000, 1900000, 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400', 'سنسور سلامتی، نمایشگر AMOLED', false, true, 4.4, 9),
('فلش مموری سامسونگ 128GB', 'Samsung 128GB Flash Drive', 'samsung-flash-128', (SELECT id FROM categories WHERE slug='storage'), 450000, 580000, 'https://images.pexels.com/photos/26493657/pexels-photo-26493657.jpeg?auto=compress&cs=tinysrgb&w=400', 'سرعت USB 3.1، مقاوم', false, true, 4.2, 10),
('کابل شارژ تایپ‌سی انکر 1.8m', 'Anker Type-C Cable 1.8m', 'anker-typec-cable', (SELECT id FROM categories WHERE slug='cables'), 320000, 400000, 'https://images.pexels.com/photos/45241/tower-plug-socket-electricity-45241.jpeg?auto=compress&cs=tinysrgb&w=400', 'شحن سریع ۱۰۰ وات', false, true, 4.5, 11),
('پاوربانک انکر 20000mAh', 'Anker 20000mAh Powerbank', 'anker-powerbank-20k', (SELECT id FROM categories WHERE slug='chargers'), 2490000, 3100000, 'https://images.pexels.com/photos/45241/tower-plug-socket-electricity-45241.jpeg?auto=compress&cs=tinysrgb&w=400', 'شحن سریع، دو پورت خروجی', false, true, 4.6, 12),
('کارت حافظه microSD سامسونگ 256GB', 'Samsung 256GB microSD', 'samsung-microsd-256', (SELECT id FROM categories WHERE slug='storage'), 780000, 950000, 'https://images.pexels.com/photos/26493657/pexels-photo-26493657.jpeg?auto=compress&cs=tinysrgb&w=400', 'کلاس ۱۰، مناسب ضبط ویدیو', false, true, 4.3, 13),
('ساعت هوشمند هواوی Watch GT 4', 'Huawei Watch GT 4', 'huawei-watch-gt4', (SELECT id FROM categories WHERE slug='smartwatch'), 6900000, 7800000, 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400', 'طراحی شیک، باتری ۱۴ روزه', false, true, 4.8, 14);

-- Insert articles
INSERT INTO articles (title_fa, title_en, slug, excerpt, content, image_url, author) VALUES
('راهنمای خرید هنذفری بلوتوثی', 'Bluetooth Headphones Buying Guide', 'headphones-guide', 'چه چیزهایی رو باید قبل از خرید هنذفری بلوتوثی در نظر بگیری؟', 'در این مقاله به بررسی نکات مهمی می‌پردازیم که باید قبل از خرید هنذفری بلوتوثی در نظر بگیرید...', 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600', 'تیم ولت مارکت'),
('مقایسه بهترین ساعت‌های هوشمند ۱۴۰۳', 'Best Smartwatches 2024 Comparison', 'smartwatch-comparison', 'کدوم ساعت هوشمند برای شما مناسب‌تره؟', 'مقایسه جامع ساعت‌های هوشمند بازار ایران از برندهای شیائومی، هواوی و سامسونگ...', 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600', 'تیم ولت مارکت'),
('چرا کابل شارژ مهمه؟', 'Why Charging Cables Matter', 'cable-guide', 'کابل شارژ تأثیر مستقیم روی سرعت شحن و عمر باتری داره', 'بسیاری از کاربران به اهمیت کابل شارژ توجه نمی‌کنند، در حالی که کابل نامناسب می‌تواند...', 'https://images.pexels.com/photos/45241/tower-plug-socket-electricity-45241.jpeg?auto=compress&cs=tinysrgb&w=600', 'تیم ولت مارکت');
