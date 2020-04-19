import pytest
import requests

USER_ENDPOINTS = "http://127.0.0.1:5000/api/users"
HOME_ENDPOINTS = "http://127.0.0.1:5000/api/home"
INDEX_ENDPOINTS = "http://127.0.0.1:5000/api/index"

def test_index_get():
    result = requests.get(INDEX_ENDPOINTS)
    assert result.status_code == 200
    assert 'data' in result.json()
    data = result.json()['data']
    assert data['dish_name'] == "Spicy Crispy Potatoes"

def test_home_page_get():
    result = requests.get(HOME_ENDPOINTS)
    assert result.status_code == 200
    assert 'data' in result.json()
    data = result.json()['data']
    if data is not []:
        assert data[0]['_id'] == 0

def test_user_get():
    """
    Test case for GET users
    """
    result = requests.get(USER_ENDPOINTS, params={"Username":"DoraDing"})
    assert result.status_code == 200
    assert 'data' in result.json()
    data = result.json()['data']
    if data is not []:
        for user in data:
            name = user['Username'].lower()
            assert 'dorading' in name

def test_user_post():
    """
    Test case for POST one user
    """
    test_user_name = '--NAME--'
    test_pw = '--PW--'

    result = requests.post(USER_ENDPOINTS, json={'Username':test_user_name,'Password':test_pw})
    assert result.status_code == 201
    assert 'data' in result.json()
    result = requests.get(USER_ENDPOINTS, params={'Username':test_user_name})
    assert result.status_code == 200
    assert 'data' in result.json()

def test_user_delete():
    """
    Test case for DELETE one user
    """
    test_user_name = '--NAME--'
    result = requests.get(USER_ENDPOINTS, params={'Username':test_user_name})
    assert result.status_code == 200
    assert 'data' in result.json()
    data = result.json()['data']
    assert data != []
    result = requests.delete(USER_ENDPOINTS, params={'Username':test_user_name})
    assert result.status_code == 200
    assert 'data' in result.json()
    result = requests.get(USER_ENDPOINTS, params={'Username':test_user_name})
    assert result.status_code == 200
    assert 'data' in result.json()
    data = result.json()['data']
    assert data == []

def test_user_put():
    """
    Test case for PUT one user
    """
    test_user_name = '--NAME--'
    test_pw = '--PW--'
    result = requests.post(USER_ENDPOINTS, json={'Username':test_user_name,'Password':test_pw})
    assert result.status_code == 201
    assert 'data' in result.json()
    result = requests.put(USER_ENDPOINTS, params={'Username':test_user_name}, json={'Password': '--PW2--'})
    assert result.status_code == 200
    assert 'data' in result.json()
    result = requests.get(USER_ENDPOINTS, params={'Username':test_user_name})
    assert result.status_code == 200
    assert 'data' in result.json()
    data = result.json()['data']
    assert data[0]['Password'] == '--PW2--'
    result = requests.delete(USER_ENDPOINTS, params={'Username':test_user_name})
    assert result.status_code == 200
    assert 'data' in result.json()
