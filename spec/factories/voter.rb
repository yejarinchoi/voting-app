FactoryBot.define do
  factory :voter do
    email { "hello@example.com" }
    password  { "genericpassword" }
    zip_code { "79801" }
  end
end
