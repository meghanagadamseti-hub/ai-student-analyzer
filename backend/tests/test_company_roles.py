import unittest

from app import create_app


class CompanyRolesEndpointTests(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app.config.update(TESTING=True)
        self.client = self.app.test_client()

    def test_companies_endpoint_returns_roles_for_every_company(self):
        response = self.client.get("/companies")
        self.assertEqual(response.status_code, 200)
        payload = response.get_json()
        self.assertIsInstance(payload, list)
        self.assertGreaterEqual(len(payload), 52)

        google = next((company for company in payload if company["name"] == "Google"), None)
        self.assertIsNotNone(google)
        self.assertIn("Software Engineer", google["roles"])
        self.assertIn("Machine Learning Engineer", google["roles"])

    def test_company_roles_endpoint_returns_company_and_roles_payload(self):
        response = self.client.get("/companies/Google/roles")
        self.assertEqual(response.status_code, 200)
        payload = response.get_json()

        self.assertEqual(payload["company"], "Google")
        self.assertIsInstance(payload["roles"], list)
        self.assertGreater(len(payload["roles"]), 0)
        self.assertEqual(payload["roles"], sorted(set(payload["roles"])))


if __name__ == "__main__":
    unittest.main()
