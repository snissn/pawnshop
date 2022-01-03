pragma solidity ^0.8.2;
pragma experimental ABIEncoderV2;

contract Goods_contract {
    uint256 timestamp;
    address sender;
    address nftaddress;
    uint256 token_id;
    uint256 value;
    uint256 interest_rate_percent;

    constructor(
        address _nftaddress,
        uint256 _token_id,
        uint256 _value,
        uint256 _interest_rate_percent
    ) {
        sender = tx.origin;
        timestamp = block.timestamp;
        nftaddress = _nftaddress;
        token_id = _token_id;
        value = _value;
        interest_rate_percent = _interest_rate_percent;
    }

    function getall()
        public
        view
        returns (
            uint256,
            address,
            address,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            timestamp,
            sender,
            nftaddress,
            token_id,
            value,
            interest_rate_percent
        );
    }

    function get_timestamp() public view returns (uint256) {
        return timestamp;
    }

    function get_sender() public view returns (address) {
        return sender;
    }

    function get_nftaddress() public view returns (address) {
        return nftaddress;
    }

    function get_token_id() public view returns (uint256) {
        return token_id;
    }

    function get_value() public view returns (uint256) {
        return value;
    }

    function get_interest_rate_percent() public view returns (uint256) {
        return interest_rate_percent;
    }
}

contract App {
    address[] Goods_list;
    uint256 Goods_list_length;

    function get_Goods_list_length() public view returns (uint256) {
        return Goods_list_length;
    }

    struct Goods_getter {
        uint256 timestamp;
        address sender;
        address nftaddress;
        uint256 token_id;
        uint256 value;
        uint256 interest_rate_percent;
    }

    function get_Goods_N(uint256 index)
        public
        view
        returns (
            uint256,
            address,
            address,
            uint256,
            uint256,
            uint256
        )
    {
        return Goods_contract(Goods_list[index]).getall();
    }

    function get_first_Goods_N(uint256 count, uint256 offset)
        public
        view
        returns (Goods_getter[] memory)
    {
        Goods_getter[] memory getters = new Goods_getter[](count);
        for (uint256 i = offset; i < count; i++) {
            Goods_contract myGoods = Goods_contract(Goods_list[i + offset]);
            getters[i - offset].timestamp = myGoods.get_timestamp();
            getters[i - offset].sender = myGoods.get_sender();
            getters[i - offset].nftaddress = myGoods.get_nftaddress();
            getters[i - offset].token_id = myGoods.get_token_id();
            getters[i - offset].value = myGoods.get_value();
            getters[i - offset].interest_rate_percent = myGoods
                .get_interest_rate_percent();
        }
        return getters;
    }

    function get_last_Goods_N(uint256 count, uint256 offset)
        public
        view
        returns (Goods_getter[] memory)
    {
        Goods_getter[] memory getters = new Goods_getter[](count);
        for (uint256 i = 0; i < count; i++) {
            Goods_contract myGoods =
                Goods_contract(Goods_list[Goods_list_length - i - offset - 1]);
            getters[i].timestamp = myGoods.get_timestamp();
            getters[i].sender = myGoods.get_sender();
            getters[i].nftaddress = myGoods.get_nftaddress();
            getters[i].token_id = myGoods.get_token_id();
            getters[i].value = myGoods.get_value();
            getters[i].interest_rate_percent = myGoods
                .get_interest_rate_percent();
        }
        return getters;
    }

    function get_Goods_user_length(address user) public view returns (uint256) {
        return user_map[user].Goods_list_length;
    }

    function get_Goods_user_N(address user, uint256 index)
        public
        view
        returns (
            uint256,
            address,
            address,
            uint256,
            uint256,
            uint256
        )
    {
        return Goods_contract(user_map[user].Goods_list[index]).getall();
    }

    function get_last_Goods_user_N(
        address user,
        uint256 count,
        uint256 offset
    ) public view returns (Goods_getter[] memory) {
        Goods_getter[] memory getters = new Goods_getter[](count);
        for (uint256 i = offset; i < count; i++) {
            getters[i - offset].timestamp = Goods_contract(
                user_map[user].Goods_list[i + offset]
            )
                .get_timestamp();
            getters[i - offset].sender = Goods_contract(
                user_map[user].Goods_list[i + offset]
            )
                .get_sender();
            getters[i - offset].nftaddress = Goods_contract(
                user_map[user].Goods_list[i + offset]
            )
                .get_nftaddress();
            getters[i - offset].token_id = Goods_contract(
                user_map[user].Goods_list[i + offset]
            )
                .get_token_id();
            getters[i - offset].value = Goods_contract(
                user_map[user].Goods_list[i + offset]
            )
                .get_value();
            getters[i - offset].interest_rate_percent = Goods_contract(
                user_map[user].Goods_list[i + offset]
            )
                .get_interest_rate_percent();
        }
        return getters;
    }

    struct UserInfo {
        address owner;
        bool exists;
        address[] Goods_list;
        uint256 Goods_list_length;
    }
    mapping(address => UserInfo) public user_map;
    address[] UserInfoList;
    uint256 UserInfoListLength;

    event NewGoods(address sender);

    function new_Goods(
        address nftaddress,
        uint256 token_id,
        uint256 value,
        uint256 interest_rate_percent
    ) public returns (address) {
        address mynew =
            address(
                new Goods_contract({
                    _nftaddress: nftaddress,
                    _token_id: token_id,
                    _value: value,
                    _interest_rate_percent: interest_rate_percent
                })
            );
        if (!user_map[tx.origin].exists) {
            user_map[tx.origin] = create_user_on_new_Goods(mynew);
        }
        user_map[tx.origin].Goods_list.push(mynew);

        user_map[tx.origin].Goods_list_length += 1;

        Goods_list.push(mynew);
        Goods_list_length += 1;

        emit NewGoods(tx.origin);

        return mynew;
    }

    function create_user_on_new_Goods(address addr)
        private
        returns (UserInfo memory)
    {
        address[] memory Goods_list;
        UserInfoList.push(addr);
        return
            UserInfo({
                exists: true,
                owner: addr,
                Goods_list: Goods_list,
                Goods_list_length: 0
            });
    }
}
