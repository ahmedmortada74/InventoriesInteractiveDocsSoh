← Go back to 
[Inventories Module Documentation](/Inventories)


# transfer_exchange.aspx

## Overview

**File**: `\Inventories\Process\transfer_exchange.aspx`
**Purpose**: Transfer exchange page for transferring inventory items between stores
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Warehouse staff, inventory administrators, transfer personnel

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Transfer Selection (Required for Loading Items)**
- **From Store Dropdown**: Must select valid source store for transfer
- **To Store Dropdown**: Must select valid destination store for transfer
- **Error Prevention**: System validates transfer is selected before loading items
- **Data Source**: Inventories_transfer_exchange table with transfer information
- **Default Behavior**: User must select transfer manually
- **Error Message**: Validation prevents item loading without transfer selection
- **Validation**: Only active transfers are available

#### 2. **Request Selection (Required for Loading Items)**
- **Request Dropdown**: Must select valid request for loading items
- **Error Prevention**: System validates request is selected before loading items
- **Data Source**: Inventories_Dispense_Request_Header table with request information
- **Default Behavior**: User must select request manually
- **Error Message**: Validation prevents item loading without request selection
- **Validation**: Only active requests with status='a' are available

#### 3. **Item Selection (Required for Transfer)**
- **Item Grid Selection**: Must select valid item from request items
- **Error Prevention**: System validates item is selected before transfer
- **Data Source**: Inventories_Dispense_Request_Details table with item information
- **Default Behavior**: User must select item manually from grid
- **Error Message**: Validation prevents transfer without item selection
- **Validation**: Only items with remaining quantity are available

#### 4. **Batch Selection (Required for Transfer)**
- **Batch Popup Selection**: Must select valid batch for transfer
- **Error Prevention**: System validates batch is selected before transfer
- **Data Source**: View_balance_with_storage table with batch information
- **Default Behavior**: User must select batch manually from popup
- **Error Message**: Validation prevents transfer without batch selection
- **Validation**: Only batches with available quantity are available

#### 5. **Transfer Quantity Input (Required for Transfer)**
- **Transfer Quantity Field**: Must enter valid transfer quantity for item
- **Error Prevention**: System validates transfer quantity is greater than 0
- **Data Source**: User input with numeric validation
- **Default Behavior**: User must enter transfer quantity manually
- **Error Message**: Validation prevents transfer with zero or negative transfer quantity
- **Validation**: Transfer quantity must be positive number

#### 6. **Confirmation Action (Required for Confirmation)**
- **Confirm Button**: Must click confirm button to confirm transfer
- **Error Prevention**: System validates confirmation action before processing
- **Data Source**: User action confirmation
- **Default Behavior**: User must click confirm button manually
- **Error Message**: Validation prevents confirmation without user action
- **Validation**: Confirmation action must be explicitly selected

### Common Error Scenarios and Prevention

#### **Transfer Selection Errors**
- **Error**: No transfer selected
- **Prevention**: Always select transfer before loading items
- **Error**: Transfer has no items
- **Prevention**: Verify transfer has items before selection

#### **Request Selection Errors**
- **Error**: No request selected
- **Prevention**: Always select request before loading items
- **Error**: Request has no items pending transfer
- **Prevention**: Verify request has items pending transfer

#### **Item Selection Errors**
- **Error**: No item selected
- **Prevention**: Always select item before transfer
- **Error**: Item has no remaining quantity
- **Prevention**: Verify item has remaining quantity before selection

#### **Batch Selection Errors**
- **Error**: No batch selected
- **Prevention**: Always select batch before transfer
- **Error**: Batch has no available quantity
- **Prevention**: Verify batch has available quantity before selection

#### **Transfer Quantity Errors**
- **Error**: No transfer quantity entered
- **Prevention**: Always enter transfer quantity before transfer
- **Error**: Zero or negative transfer quantity
- **Prevention**: Always enter positive transfer quantity values

#### **Confirmation Errors**
- **Error**: Confirmation fails
- **Prevention**: Ensure transfer is selected before confirmation
- **Error**: Items not reviewed
- **Prevention**: Review all items before confirmation

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have transfer permissions** via employee group assignments
3. **Transfers must be configured** in the system
4. **Requests must be pending transfer** in the system
5. **Items must be available** for transfer

#### **Required System State**
- User authentication must be active
- Transfer permissions must be configured
- Transfer data must be current
- Request data must be available
- Item data must be available

### Success Criteria

#### **For Transfer Selection**
- ✅ Transfer dropdown populated with active transfers only
- ✅ Transfer validation ensures proper item loading
- ✅ Transfer selection enables item filtering

#### **For Request Selection**
- ✅ Request dropdown populated with pending transfer requests only
- ✅ Request validation ensures proper item loading
- ✅ Request selection enables item display

#### **For Item Selection**
- ✅ Item grid displays all items for selected request
- ✅ Item details show complete transfer information
- ✅ Selection functionality works properly
- ✅ Total calculations are accurate

#### **For Batch Selection**
- ✅ Batch popup displays all batches for selected item
- ✅ Batch details show complete batch information
- ✅ Selection functionality works properly
- ✅ Quantity calculations are accurate

#### **For Transfer Management**
- ✅ Transfer creates proper transfer records
- ✅ Item selection enables transfer workflow
- ✅ Transfer workflow works with proper validation
- ✅ Transfer completion provides success feedback

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Horizontal" dir="rtl" SettingsItemCaptions-HorizontalAlign="Right">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with horizontal structure for transfer exchange

### Transfer Selection Section

```html
<!-- Transfer Selection -->
<dx:BootstrapLayoutGroup ColSpanMd="12" Caption="">
    <Items>
        <dx:BootstrapLayoutItem Caption="التحويل" ColSpanMd="10" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display: flex">
                        <dx:BootstrapComboBox runat="server" NullText="من مخزن" ID="ts" Width="100%" AutoPostBack="true" ValueField="id" TextField="transfer" DataSourceID="transfer_list" CssClasses-Control="cc"></dx:BootstrapComboBox>
                        <dx:BootstrapComboBox runat="server" NullText="إلى مخزن" ID="ts1" Width="100%" AutoPostBack="true" ValueField="id" TextField="transfer" DataSourceID="transfer_list2" CssClasses-Control="cc"></dx:BootstrapComboBox>
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="" ColSpanMd="2" CssClasses-Caption="cc">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton runat="server" ID="Search" Width="100%" Text="بحث" OnClick="Search_Click">
                        <SettingsBootstrap RenderOption="Info" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Request Selection Section

```html
<!-- Request Selection -->
<dx:BootstrapLayoutItem Caption="طلب التعزيز" ColSpanMd="5" CssClasses-Caption="cc" BeginRow="true">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox runat="server" ID="Requt" DataSourceID="RequestDS" AutoPostBack="true" TextField="OrderNo" ValueField="id" OnSelectedIndexChanged="tp_SelectedIndexChanged">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="OrderNo" />
                    <dx:BootstrapListBoxField FieldName="arabic_name" />
                    <dx:BootstrapListBoxField FieldName="Date" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Store Information Section

```html
<!-- Store Information -->
<dx:BootstrapLayoutItem Caption="المخزن المرسل" ColSpanMd="6" CssClasses-Caption="cc">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox runat="server" ID="txtstorage1" Enabled="false"></dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="المخزن المستلم" ColSpanMd="6" CssClasses-Caption="cc">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapTextBox runat="server" ID="txtstorage2" Enabled="false"></dx:BootstrapTextBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Request Items Grid Section

```html
<!-- Request Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="RequesrItems" DataSourceID="list" AutoPostBack="true" KeyFieldName="id" OnSelectionChanged="grid_SelectionChanged" ClientInstanceName="gv_selected_items_type" ShowHeaderWhenEmpty="True" runat="server" Width="100%" AutoGenerateColumns="False" Styles-Cell-HorizontalAlign="Center" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true" OnHtmlRowPrepared="RequesrItems_HtmlRowPrepared">
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
                <Settings ShowFilterRow="true" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="true"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="id" Caption="Code" ReadOnly="True" Visible="false"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="item_code" Caption="كود الصنف" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption="اسم الصنف" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Quntity" Caption="الكمية" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="description" Caption="وحده الطلب" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Done" Caption="الكميه المحوله" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Remain" Caption="المتبقى" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Item_Type_id" Caption="كود الصرف" Visible="false" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="ItemUnit_storage_Id" Visible="false" Caption="كود وحده التخزين" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewDateColumn FieldName="Due_Date" Caption="تاريخ التحويل" VisibleIndex="6"></dx:BootstrapGridViewDateColumn>
                </Columns>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" AutoExpandAllGroups="false"></SettingsBehavior>
                <SettingsDetail ExportMode="All" />
                <SettingsDataSecurity AllowDelete="False" AllowInsert="False" AllowEdit="False" />
                <TotalSummary>
                    <dx:ASPxSummaryItem FieldName="item_code" SummaryType="Count" DisplayFormat="الاصناف ={0 }" />
                    <dx:ASPxSummaryItem FieldName="Quntity" SummaryType="Sum" DisplayFormat="الكمية ={0 }" />
                </TotalSummary>
                <Settings ShowFooter="True" />
                <Settings VerticalScrollableHeight="350" />
                <SettingsPager PageSize="10">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
                <SettingsExport EnableClientSideExportAPI="true" ExcelExportMode="WYSIWYG" />
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Batch and Transfer Section

```html
<!-- Batch and Transfer -->
<dx:BootstrapLayoutGroup ColSpanMd="12" Caption="">
    <Items>
        <dx:BootstrapLayoutItem Caption="الدفعة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="6">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display: flex; align-items: center; justify-content: center">
                        <div style="border: 1px solid #d7d7d7">
                            <dx:BootstrapButton runat="server" Width="100%" ID="batch_no" OnClick="batch_no_Click">
                                <CssClasses Icon="simple-icon-arrow-up" />
                                <SettingsBootstrap RenderOption="Link" />
                            </dx:BootstrapButton>
                        </div>
                        <dx:BootstrapTextBox runat="server" Enabled="false" Width="40%" ID="batch"></dx:BootstrapTextBox>
                        <dx:BootstrapTextBox runat="server" Enabled="false" Width="100%" ID="Date"></dx:BootstrapTextBox>
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="التحويل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="6">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapSpinEdit runat="server" Width="100%" ID="Exchange_amount" MinValue="0"></dx:BootstrapSpinEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="المتوفر" CaptionSettings-HorizontalAlign="Right" ColSpanMd="6">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Width="100%" Enabled="false" ID="Avaliable"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="وحدة التحويل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" ID="Unit" Width="100%" Enabled="false" AutoPostBack="true"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display: flex; align-content: center; justify-content: center;">
                        <dx:BootstrapButton ID="add" runat="server" ClientInstanceName="btn" Text="اضافة" OnClick="add_Click">
                            <CssClasses Icon="simple-icon-plus" />
                            <SettingsBootstrap RenderOption="Secondary" />
                        </dx:BootstrapButton>
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Storage Unit Information Section

```html
<!-- Storage Unit Information -->
<dx:BootstrapLayoutGroup ColSpanMd="12" Caption="">
    <Items>
        <dx:BootstrapLayoutItem Caption="المتوفر بوحدة التخزين" CaptionSettings-HorizontalAlign="Right" ColSpanMd="6">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Width="100%" Enabled="false" ID="Avaliable_Storage"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem Caption="المتوفر بوحدة الصرف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="6">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Width="100%" Enabled="false" ID="Avaliable_sarf"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Temporary Transfer Grid Section

```html
<!-- Temporary Transfer Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapGridView runat="server" ID="checkGridViewTemp" ClientInstanceName="gridre" OnRowDeleted="checkGridViewTemp_RowDeleted" OnCustomUnboundColumnData="checkGridViewTemp_CustomUnboundColumnData" AutoGenerateColumns="false" KeyFieldName="ID" Styles-Cell-HorizontalAlign="Center" DataSourceID="checkGridViewTempDS" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="false" SettingsBehavior-ProcessSelectionChangedOnServer="false" OnSelectionChanged="checkGridViewTemp_SelectionChanged">
                        <Settings ShowFilterRow="true" />
                        <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                        <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                        <Columns>
                            <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowDeleteButton="true" Width="30px"></dx:BootstrapGridViewCommandColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="ID" Caption="ID" Visible="false"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="Number" Caption="مسلسل" UnboundType="String"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="store" Caption="كودالمخزن"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="storename" Caption="اسم المخزن"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="patch" Caption="الدفعه"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="Quntitiy" Caption="الكميه المصروفه"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="item" Caption="كود الصنف"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="arabic_name" Caption="اسم الصنف"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="transfer_unit" Caption="اسم الصنف" Visible="false"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="status" Caption="الحاله"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="from_store" Visible="false"></dx:BootstrapGridViewDataColumn>
                            <dx:BootstrapGridViewDataColumn FieldName="to_store" Visible="false"></dx:BootstrapGridViewDataColumn>
                        </Columns>
                        <Settings VerticalScrollableHeight="350" />
                        <SettingsPager PageSize="50">
                            <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                        </SettingsPager>
                        <Settings ShowFilterRow="True" ShowGroupPanel="true"></Settings>
                        <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                        <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
                    </dx:BootstrapGridView>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
            <ContentCollection>
                <dx:ContentControl>
                    <div style="display: flex; align-items: center; justify-content: center">
                        <dx:BootstrapButton ID="save_btn" runat="server" ClientInstanceName="btn" Width="20%" Text="تحويل" OnClick="save_btn_Click">
                            <CssClasses Icon="simple-icon-basket-loaded" />
                            <SettingsBootstrap RenderOption="Danger" />
                        </dx:BootstrapButton>
                    </div>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Batch Selection Popup Section

```html
<!-- Batch Selection Popup -->
<dx:BootstrapPopupControl ID="batchPoP" runat="server" ClientInstanceName="popupMessage" CloseAnimationType="Auto" CloseOnEscape="True" HeaderText="الدفعه" Modal="True" PopupHorizontalAlign="WindowCenter" PopupVerticalAlign="WindowCenter" Width="400px" Height="400px">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapFormLayout runat="server">
                <Items>
                    <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
                        <ContentCollection>
                            <dx:ContentControl>
                                <dx:BootstrapGridView runat="server" ID="batchGridView" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="ID" Styles-Cell-HorizontalAlign="Center" DataSourceID="batchGridViewDS" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessSelectionChangedOnServer="true" OnSelectionChanged="batchGridView_SelectionChanged" OnHtmlRowPrepared="batchGridView_HtmlRowPrepared">
                                    <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                                    <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                                    <Columns>
                                        <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="True" Width="30px"></dx:BootstrapGridViewCommandColumn>
                                        <dx:BootstrapGridViewDataColumn FieldName="ID" Caption="رقم الدفعه"></dx:BootstrapGridViewDataColumn>
                                        <dx:BootstrapGridViewDataColumn FieldName="batch_no" Caption="رقم التشغيل"></dx:BootstrapGridViewDataColumn>
                                        <dx:BootstrapGridViewDataColumn FieldName="Expiration_date" Caption="تاريخ انتهاء الصلاحيه"></dx:BootstrapGridViewDataColumn>
                                        <dx:BootstrapGridViewDataColumn FieldName="remain" Caption="الكميه" Visible="false"></dx:BootstrapGridViewDataColumn>
                                    </Columns>
                                    <Settings VerticalScrollableHeight="350" />
                                    <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                                    <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
                                </dx:BootstrapGridView>
                            </dx:ContentControl>
                        </ContentCollection>
                    </dx:BootstrapLayoutItem>
                </Items>
            </dx:BootstrapFormLayout>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapPopupControl>
```

### Confirmation Popup Section

```html
<!-- Confirmation Popup -->
<dx:BootstrapPopupControl ID="Comfirm" runat="server" ClientInstanceName="popupMessage" CloseAnimationType="Auto" CloseOnEscape="True" HeaderText="تأكيد الإستلام" Modal="True" PopupHorizontalAlign="WindowCenter" PopupVerticalAlign="WindowCenter" Width="500px" Height="250px">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapFormLayout runat="server" dir="rtl" SettingsItemCaptions-HorizontalAlign="Right">
                <SettingsItemCaptions HorizontalAlign="Right"></SettingsItemCaptions>
                <Items>
                    <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
                        <ContentCollection>
                            <dx:ContentControl>
                                <dx:BootstrapTextBox runat="server" Enabled="false" ID="requestusername"></dx:BootstrapTextBox>
                            </dx:ContentControl>
                        </ContentCollection>
                    </dx:BootstrapLayoutItem>
                    <dx:BootstrapLayoutItem Caption="اسم المستخدم" ColSpanMd="6">
                        <ContentCollection>
                            <dx:ContentControl>
                                <dx:BootstrapTextBox runat="server" ID="txtEmpId" NullText="Enter your UserName"></dx:BootstrapTextBox>
                            </dx:ContentControl>
                        </ContentCollection>
                    </dx:BootstrapLayoutItem>
                    <dx:BootstrapLayoutItem Caption="كلمه المرور" ColSpanMd="6">
                        <ContentCollection>
                            <dx:ContentControl>
                                <dx:BootstrapTextBox Password="true" runat="server" ID="txtpassword" NullText="Enter your Password"></dx:BootstrapTextBox>
                            </dx:ContentControl>
                        </ContentCollection>
                    </dx:BootstrapLayoutItem>
                    <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
                        <ContentCollection>
                            <dx:ContentControl>
                                <div style="display: flex; align-items: center; justify-content: center">
                                    <dx:BootstrapButton runat="server" ID="BtnConfirm" Text="تأكيد الاستلام" ClientInstanceName="btn1" OnClick="BtnConfirm_Click">
                                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn1,'btn1'); }" />
                                        <SettingsBootstrap RenderOption="Success" />
                                    </dx:BootstrapButton>
                                    <dx:BootstrapButton runat="server" ID="cancle" Text="رفض الاستلام" ClientInstanceName="btn2" OnClick="cancle_Click">
                                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn2,'btn2'); }" />
                                        <SettingsBootstrap RenderOption="Danger" />
                                    </dx:BootstrapButton>
                                </div>
                            </dx:ContentControl>
                        </ContentCollection>
                    </dx:BootstrapLayoutItem>
                    <dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
                        <ContentCollection>
                            <dx:ContentControl>
                                <dx:ASPxLabel ForeColor="#800000" Font-Bold="true" Font-Size="Medium" Text=" ملاحظة :فى حالة رفض الاستلام يتم إغلاق الطلب" ID="MSG" runat="server" Width="100%"></dx:ASPxLabel>
                            </dx:ContentControl>
                        </ContentCollection>
                    </dx:BootstrapLayoutItem>
                </Items>
            </dx:BootstrapFormLayout>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapPopupControl>
```

## Data Flow Architecture

### Query String Parameters

The system uses multiple parameters for comprehensive data filtering:

**Transfer Parameters**:
- `@from` - Source store ID for filtering transfers
- `@to` - Destination store ID for filtering transfers

**Request Parameters**:
- `@OrderType` - Request ID for filtering items

**Item Parameters**:
- `@code` - Item code for filtering batches
- `@store` - Store ID for filtering batches
- `@emp` - Employee code for filtering temporary records
- `@date` - Date for filtering temporary records

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Transfer Selection**: Loads items based on selected transfer
3. **Request Selection**: Loads items based on selected request
4. **Item Selection**: Loads batch information for selected item
5. **Batch Selection**: Loads batch details for selected batch
6. **Transfer Quantity Entry**: Enters transfer quantity for item
7. **Item Addition**: Adds item to temporary transfer grid
8. **Transfer Save**: Saves complete transfer records
9. **Confirmation**: Confirms transfer receipt

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication
2. Loads transfer information
3. Sets default transfer state
4. Initializes date displays

### Search_Click Method

```csharp
protected void Search_Click(object sender, EventArgs e)
```

**Purpose**: Searches for requests based on selected transfer

**Process**:
1. Validates transfer selection
2. Sets parameters for request data source
3. Binds request dropdown
4. Updates transfer information display

### tp_SelectedIndexChanged Method

```csharp
protected void tp_SelectedIndexChanged(object sender, EventArgs e)
```

**Purpose**: Loads items based on selected request

**Process**:
1. Validates request selection
2. Sets parameters for item data source
3. Binds item grid
4. Updates request information display

### grid_SelectionChanged Method

```csharp
protected void grid_SelectionChanged(object sender, EventArgs e)
```

**Purpose**: Loads batch information for selected item

**Process**:
1. Validates item selection
2. Loads batch details
3. Updates item information display
4. Enables transfer workflow

### batch_no_Click Method

```csharp
protected void batch_no_Click(object sender, EventArgs e)
```

**Purpose**: Opens batch selection popup

**Process**:
1. Validates item selection
2. Opens batch popup
3. Loads batch information
4. Provides batch selection interface

### batchGridView_SelectionChanged Method

```csharp
protected void batchGridView_SelectionChanged(object sender, EventArgs e)
```

**Purpose**: Loads batch details for selected batch

**Process**:
1. Validates batch selection
2. Loads batch details
3. Updates batch information display
4. Enables transfer workflow

### add_Click Method

```csharp
protected void add_Click(object sender, EventArgs e)
```

**Purpose**: Adds item to temporary transfer grid

**Process**:
1. Validates all required fields are filled
2. Validates transfer quantity is greater than 0
3. Validates batch is selected
4. Checks item availability
5. Inserts item into temporary table
6. Refreshes temporary transfer grid
7. Clears form fields for next addition

### save_btn_Click Method

```csharp
protected void save_btn_Click(object sender, EventArgs e)
```

**Purpose**: Saves complete transfer records

**Process**:
1. Validates at least one item is added
2. Generates new transfer document number
3. Inserts transfer header record
4. Inserts all temporary items as details
5. Clears temporary tables
6. Refreshes all grids and controls
7. Provides success feedback

### BtnConfirm_Click Method

```csharp
protected void BtnConfirm_Click(object sender, EventArgs e)
```

**Purpose**: Confirms transfer receipt

**Process**:
1. Validates user credentials
2. Validates confirmation permissions
3. Updates transfer status to confirmed
4. Refreshes transfer grid
5. Provides success feedback

### cancle_Click Method

```csharp
protected void cancle_Click(object sender, EventArgs e)
```

**Purpose**: Rejects transfer receipt

**Process**:
1. Validates user credentials
2. Validates rejection permissions
3. Updates transfer status to rejected
4. Closes transfer request
5. Provides success feedback

## Database Integration

### Core Database Tables

#### **Inventories_transfer_exchange**
- **Purpose**: Transfer exchange configuration
- **Key Fields**: id, transfer, active
- **Usage**: Provides transfer list for filtering
- **Filtering**: Only active transfers

#### **Inventories_Dispense_Request_Header**
- **Purpose**: Dispense request header information
- **Key Fields**: id, OrderNo, inv_from, inv_to, Date, Active, OrderType, Status, closed
- **Usage**: Tracks request information for transfer
- **Filtering**: Only active requests with status='a'

#### **Inventories_Dispense_Request_Details**
- **Purpose**: Dispense request details with item information
- **Key Fields**: id, Header_FK, item_code, Quntity, Done, Remain, Due_Date, Item_Type_id, ItemUnit_storage_Id
- **Usage**: Tracks request items for transfer
- **Filtering**: Only items with remaining quantity

#### **Inventories_wharehouse_store**
- **Purpose**: Warehouse store master data
- **Key Fields**: id, arabic_name, Store_type, active
- **Usage**: Provides store list for filtering
- **Filtering**: Only active stores

#### **Inventories_Item_Settings**
- **Purpose**: Item master data with descriptions
- **Key Fields**: item_code, arabic_name, Item_Type_id, active
- **Usage**: Provides item information for display
- **Filtering**: Only active items

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description
- **Usage**: Provides unit information for items

#### **View_balance_with_storage**
- **Purpose**: View with batch and storage information
- **Key Fields**: ID, batch_no, Expiration_date, remain, remain_storage, item_code, storeid
- **Usage**: Provides batch information for transfer
- **Filtering**: Only batches with available quantity

#### **Inventories_General_Dispense_temp**
- **Purpose**: Temporary dispense records before save
- **Key Fields**: ID, store, patch, Quntitiy, item, transfer_unit, from_store, to_store, emp, date, ReqDetailsID
- **Usage**: Tracks transfer items before save

#### **Inventories_rules_stores**
- **Purpose**: Store rules for employee access
- **Key Fields**: id, store_id, emp_id, active
- **Usage**: Provides store access for employees
- **Filtering**: Only active rules for employee

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code from user profile
**Validation**: Ensures user is authenticated before accessing transfer data

#### **Transfer Filtering**
```sql
select Inventories_transfer_exchange.id, Inventories_transfer_exchange.transfer 
from [frontoffice].[dbo].[Inventories_transfer_exchange]
```

**Filtering Logic**: Shows all transfers for user
**Permission Logic**: All transfers are available
**Validation**: Ensures transfer has items

#### **Request Filtering**
```sql
SELECT distinct F.id, OrderNo, Inventories_wharehouse_store.arabic_name, CONVERT(VARCHAR(10), Date, 103) Date 
FROM Inventories_Dispense_Request_Header F 
inner join Inventories_wharehouse_store on Inventories_wharehouse_store.id = f.inv_to 
inner join Inventories_Dispense_Request_Details on F.id = Header_FK 
inner join Inventories_rules_stores R on R.store_id = inv_from 
where F.Active = 1 and OrderType=9 and inv_from in (select id from Inventories_wharehouse_store where Store_type = @from) 
and R.emp_id = @Emp and R.active=1 and Status='a' and closed=0
```

**Filtering Logic**: Shows only requests pending transfer
**Permission Logic**: Only requests pending transfer are available
**Validation**: Ensures request has items pending transfer

## Client-Side JavaScript

### AutoPostBack Functionality

```html
AutoPostBack="true"
```

**AutoPostBack Logic**: Triggers server-side events when dropdown selections change
**User Experience**: Provides immediate feedback when selections change
**Usage**: Applied to transfer, request, and batch dropdowns

### Button Disable Function

```javascript
function DisableButton3(buttonnameobject, buttonnamestring) {
    window.setTimeout(buttonnamestring + ".SetEnabled(false)", 0);
    var x = buttonnameobject;
    x.SetText("جارى التحميل...");
}
```

**Button Logic**: Disables button and changes text during processing
**User Experience**: Prevents duplicate clicks and provides processing feedback
**Usage**: Applied to all operation buttons to prevent multiple submissions

### Checkbox Selection Function

```javascript
function CheckOne(obj) {
    var grid = obj.parentNode.parentNode.parentNode;
    var inputs = grid.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "checkbox") {
            if (obj.checked && inputs[i] != obj && inputs[i].checked) {
                inputs[i].checked = false;
            }
        }
    }
}
```

**Checkbox Logic**: Ensures only one checkbox is selected at a time
**User Experience**: Provides single selection behavior for grid
**Usage**: Applied to grid checkboxes for single selection

### Master-Detail Grid Handling

```javascript
function MasterGrid_DetailRowCollapsing(s, e) {
    var key = masterGrid.GetRowKey(e.visibleIndex);
    hf.Set('collapsedRowKey', key);
}
function MasterGrid_EndCallback(s, e) {
    if (hf.Contains('collapsedRowKey'))
        hf.Remove('collapsedRowKey');
}
```

**Grid Features**: Master-detail grid functionality with collapsible rows
**State Management**: Client-side state management for collapsed rows
**Server Integration**: Coordinates with server-side event handling

### Popup Handling Function

```javascript
var keyValue;
function OnMoreInfoClick(element, key) {
    callbackPanel.SetContentHtml("");
    popup.ShowAtElement(element);
    keyValue = key;
}
function popup_Shown(s, e) {
    callbackPanel.PerformCallback(keyValue);
}
```

**Popup Logic**: Handles popup display and callback
**User Experience**: Provides detailed information display
**Usage**: Applied to grid for detailed information display

### Back Button Prevention Function

```javascript
function noBack() { window.history.forward(); }
noBack();
window.onload = noBack;
window.onpageshow = function (evt) { if (evt.persisted) noBack(); }
window.onunload = function () { void (0); }
```

**Back Button Logic**: Prevents browser back button usage
**User Experience**: Ensures proper workflow navigation
**Usage**: Applied to page for workflow security

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with horizontal structure
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Transfer Selection Section**
```html
<!-- Transfer Selection -->
<dx:BootstrapLayoutGroup ColSpanMd="12" Caption="">
    <Items>
        <dx:BootstrapLayoutItem Caption="التحويل" ColSpanMd="10" CssClasses-Caption="cc">
        <dx:BootstrapLayoutItem Caption="" ColSpanMd="2" CssClasses-Caption="cc">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Request Selection Section**
```html
<!-- Request Selection -->
<dx:BootstrapLayoutItem Caption="طلب التعزيز" ColSpanMd="5" CssClasses-Caption="cc" BeginRow="true">
```

#### **3. Store Information Section**
```html
<!-- Store Information -->
<dx:BootstrapLayoutItem Caption="المخزن المرسل" ColSpanMd="6" CssClasses-Caption="cc">
<dx:BootstrapLayoutItem Caption="المخزن المستلم" ColSpanMd="6" CssClasses-Caption="cc">
```

#### **4. Request Items Grid Section**
```html
<!-- Request Items Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **5. Batch and Transfer Section**
```html
<!-- Batch and Transfer -->
<dx:BootstrapLayoutGroup ColSpanMd="12" Caption="">
    <Items>
        <dx:BootstrapLayoutItem Caption="الدفعة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="6">
        <dx:BootstrapLayoutItem Caption="التحويل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="6">
        <dx:BootstrapLayoutItem Caption="المتوفر" CaptionSettings-HorizontalAlign="Right" ColSpanMd="6">
        <dx:BootstrapLayoutItem Caption="وحدة التحويل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
        <dx:BootstrapLayoutItem Caption="" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **6. Storage Unit Information Section**
```html
<!-- Storage Unit Information -->
<dx:BootstrapLayoutGroup ColSpanMd="12" Caption="">
    <Items>
        <dx:BootstrapLayoutItem Caption="المتوفر بوحدة التخزين" CaptionSettings-HorizontalAlign="Right" ColSpanMd="6">
        <dx:BootstrapLayoutItem Caption="المتوفر بوحدة الصرف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="6">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **7. Temporary Transfer Grid Section**
```html
<!-- Temporary Transfer Grid -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **8. Batch Selection Popup Section**
```html
<!-- Batch Selection Popup -->
<dx:BootstrapPopupControl ID="batchPoP" runat="server">
```

#### **9. Confirmation Popup Section**
```html
<!-- Confirmation Popup -->
<dx:BootstrapPopupControl ID="Comfirm" runat="server">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Transfer Data Source
SqlDataSource transfer_list = new SqlDataSource();
transfer_list.ConnectionString = ConfigurationManager.ConnectionStrings["BackOffice_CS"].ConnectionString;
transfer_list.SelectCommand = "select Inventories_transfer_exchange.id, Inventories_transfer_exchange.transfer from [frontoffice].[dbo].[Inventories_transfer_exchange]";

// Request Data Source
SqlDataSource RequestDS = new SqlDataSource();
RequestDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
RequestDS.SelectCommand = "SELECT distinct F.id, OrderNo, Inventories_wharehouse_store.arabic_name, CONVERT(VARCHAR(10), Date, 103) Date FROM Inventories_Dispense_Request_Header F inner join Inventories_wharehouse_store on Inventories_wharehouse_store.id = f.inv_to inner join Inventories_Dispense_Request_Details on F.id = Header_FK inner join Inventories_rules_stores R on R.store_id = inv_from where F.Active = 1 and OrderType=9 and inv_from in (select id from Inventories_wharehouse_store where Store_type = @from) and R.emp_id = @Emp and R.active=1 and Status='a' and closed=0";

// Item Data Source
SqlDataSource list = new SqlDataSource();
list.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
list.SelectCommand = "select distinct IIS.arabic_name, IIS.item_code, Quntity, sum(iif(T.Quntitiy is null, Done, Quntitiy - Done)) as Done, Quntity - sum(iif(T.Quntitiy is null, Done, Quntitiy - Done)) as Remain, Due_Date, IIS.Item_Type_id, Inventories_Dispense_Request_Details.id, ItemUnit_storage_Id, Inventories_UOM.description from Inventories_Dispense_Request_Details inner join Inventories_Dispense_Request_Header f on f.id=Header_FK inner join Inventories_UOM on Inventories_UOM.id = ItemUnit_storage_Id inner join Inventories_Item_Settings IIS on IIS.item_code = Inventories_Dispense_Request_Details.item_code left join Inventories_General_Dispense_temp T on T.ReqDetailsID = Inventories_Dispense_Request_Details.id where Header_FK=@OrderType group by IIS.arabic_name, IIS.item_code, Quntity, Due_Date, IIS.Item_Type_id, Inventories_Dispense_Request_Details.id, ItemUnit_storage_Id, Inventories_UOM.description order by IIS.item_code";

// Batch Data Source
SqlDataSource batchGridViewDS = new SqlDataSource();
batchGridViewDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
batchGridViewDS.SelectCommand = "select ID, Expiration_date, sum(remain_storage) remain, batch_no, sum(remain) as remain_sarf from View_balance_with_storage where item_code=@code and storeid=@store and ID not in (select patch FROM Inventories_General_Dispense_temp where emp=@emp and item=@code and date=@date) group by ID, Expiration_date, remain, batch_no having remain > 0 order by Expiration_date, ID";

// Temporary Transfer Data Source
SqlDataSource checkGridViewTempDS = new SqlDataSource();
checkGridViewTempDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
checkGridViewTempDS.SelectCommand = "SELECT Inventories_General_Dispense_temp.ID, transfer_unit, store, patch, Quntitiy, item, IIS.arabic_name, Inventories_wharehouse_store.arabic_name as 'storename', from_store, to_store, 'Waiting' as status FROM Inventories_General_Dispense_temp inner join Inventories_Item_Settings IIS on IIS.item_code = Inventories_General_Dispense_temp.item inner join Inventories_wharehouse_store on Inventories_wharehouse_store.id = store where emp=@emp and date=@date order by Inventories_General_Dispense_temp.ID";
```

## Business Logic and Validation

### Transfer Selection Validation

```csharp
protected void Search_Click(object sender, EventArgs e)
{
    if (ts.Value == "" || ts.Value == null || ts1.Value == "" || ts1.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار التحويل');", true);
        return;
    }
    // ... additional validation
}
```

**Transfer Logic**: Validates transfer selection before loading requests
**Error Prevention**: Prevents request loading without transfer selection

### Request Selection Validation

```csharp
protected void tp_SelectedIndexChanged(object sender, EventArgs e)
{
    if (Requt.Value == "" || Requt.Value == null)
    {
        // Clear item grid
        RequesrItems.DataSource = null;
        RequesrItems.DataBind();
        return;
    }
    // ... additional validation
}
```

**Request Logic**: Validates request selection before loading items
**Error Prevention**: Prevents item loading without request selection

### Item Selection Validation

```csharp
protected void grid_SelectionChanged(object sender, EventArgs e)
{
    if (RequesrItems.Selection.Count == 0)
    {
        // Clear batch information
        batch.Text = "";
        Date.Text = "";
        return;
    }
    // ... additional validation
}
```

**Item Logic**: Validates item selection before loading batch information
**Error Prevention**: Prevents batch loading without item selection

### Batch Selection Validation

```csharp
protected void batchGridView_SelectionChanged(object sender, EventArgs e)
{
    if (batchGridView.Selection.Count == 0)
    {
        // Clear batch information
        batch.Text = "";
        Date.Text = "";
        return;
    }
    // ... additional validation
}
```

**Batch Logic**: Validates batch selection before loading batch details
**Error Prevention**: Prevents batch details loading without batch selection

### Transfer Quantity Validation

```csharp
protected void add_Click(object sender, EventArgs e)
{
    if (Convert.ToDecimal(Exchange_amount.Value) <= 0)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال الكمية');", true);
        return;
    }
    // ... additional validation
}
```

**Transfer Quantity Logic**: Validates transfer quantity is positive and within limits
**Error Prevention**: Prevents transfer with invalid transfer quantity

### Confirmation Validation

```csharp
protected void BtnConfirm_Click(object sender, EventArgs e)
{
    if (txtEmpId.Text == "" || txtEmpId.Text == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال اسم المستخدم');", true);
        return;
    }
    // ... additional validation
}
```

**Confirmation Logic**: Validates user credentials before confirmation
**Error Prevention**: Prevents confirmation without user credentials

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Transfer Selection Validation**: Must select transfer before loading requests
- **Request Selection Validation**: Must select request before loading items
- **Item Selection Validation**: Must select item before loading batch information
- **Batch Selection Validation**: Must select batch before loading batch details
- **Transfer Quantity Validation**: Must enter transfer quantity before transfer
- **Confirmation Validation**: Must enter user credentials before confirmation

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Transfer Validation**: Ensures transfer is active and available
- **Request Validation**: Ensures request is pending transfer
- **Item Validation**: Ensures item has remaining quantity
- **Batch Validation**: Ensures batch has available quantity
- **Transfer Quantity Validation**: Ensures transfer quantity is positive and within limits
- **Confirmation Validation**: Ensures user credentials are valid

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Transfer Access**: Ensures user has access to selected transfer
- **Confirmation Access**: Ensures user can access and modify confirmation records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Transfer Success**: "تم التحويل" (Transfer completed successfully)
- **Confirmation Success**: "تم تأكيد الاستلام" (Receipt confirmed successfully)
- **Rejection Success**: "تم رفض الاستلام" (Receipt rejected successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of grids after all operations
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Transfer Exchange Management System**
- **Database Tables**:
  - `Inventories_transfer_exchange` - Transfer exchange configuration
  - `Inventories_Dispense_Request_Header` - Dispense request header information
  - `Inventories_Dispense_Request_Details` - Dispense request item details
  - `Inventories_wharehouse_store` - Store master data
  - `Inventories_Item_Settings` - Item master data
  - `Inventories_UOM` - Unit of measure master data
  - `View_balance_with_storage` - View with batch and storage information
  - `Inventories_General_Dispense_temp` - Temporary dispense records
  - `Inventories_rules_stores` - Store rules for employee access
- **Integration Details**:
  - Transfer selection controls request filtering
  - Request selection controls item display
  - Item selection controls batch filtering
  - Batch selection controls transfer
  - Transfer tracked with complete information
- **Data Flow**:
  - Transfers filtered for user access
  - Requests filtered by transfer
  - Items filtered by request
  - Batches filtered by item
  - Transfer tracked by user

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
- **Database Tables**:
  - Connection string: `frontofficeConnectionString`
- **Permission System**:
  - User authentication required for all transfer operations
  - Transfer access controlled by user permissions

### Data Exchange

#### **Transfer and Request Information**
- **Database Tables**:
  - `Inventories_transfer_exchange` - Transfer exchange configuration
  - `Inventories_Dispense_Request_Header` - Dispense request header information
- **Real-time Data**:
  - Transfer information for filtering
  - Request information for transfer
- **Data Relationships**:
  - Transfers linked to requests via transfer configuration
  - Requests linked to items via Header_FK
  - Transfer tracked by user

#### **Item and Batch Information**
- **Database Tables**:
  - `Inventories_Dispense_Request_Details` - Dispense request item details
  - `View_balance_with_storage` - View with batch and storage information
  - `Inventories_General_Dispense_temp` - Temporary dispense records
- **Real-time Data**:
  - Item details and descriptions
  - Batch information and quantities
  - Unit information and calculations
- **Data Relationships**:
  - Items linked to batches via item_code
  - Batches linked to transfer via patch
  - Unit information calculated from unit associations

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء اختيار التحويل" Error**
- **Cause**: Transfer not selected before loading requests
- **Solution**: Always select transfer before loading requests
- **Prevention**: Transfer selection is required for all transfer operations

#### **"الرجاء اختيار طلب التعزيز" Error**
- **Cause**: Request not selected before loading items
- **Solution**: Always select request before loading items
- **Prevention**: Request selection is required for all transfer operations

#### **"الرجاء اختيار الصنف" Error**
- **Cause**: Item not selected before transfer
- **Solution**: Always select item before transfer
- **Prevention**: Item selection is required for all transfer operations

#### **"الرجاء اختيار الدفعة" Error**
- **Cause**: Batch not selected before transfer
- **Solution**: Always select batch before transfer
- **Prevention**: Batch selection is required for all transfer operations

#### **"الرجاء ادخال الكمية" Error**
- **Cause**: Transfer quantity not entered before transfer
- **Solution**: Always enter transfer quantity before transfer
- **Prevention**: Transfer quantity entry is required for all transfer operations

#### **"الرجاء ادخال اسم المستخدم" Error**
- **Cause**: User credentials not entered before confirmation
- **Solution**: Always enter user credentials before confirmation
- **Prevention**: User credentials entry is required for all confirmation operations

#### **No Requests Found**
- **Cause**: No requests pending transfer
- **Solution**: Verify requests are pending transfer
- **Prevention**: Ensure requests are pending transfer

#### **Transfer Failed Error**
- **Cause**: Transfer cannot be processed
- **Solution**: Verify all required fields are filled
- **Prevention**: Ensure proper validation before transfer

#### **Confirmation Failed Error**
- **Cause**: Confirmation cannot be processed
- **Solution**: Verify user credentials are entered before confirmation
- **Prevention**: Ensure proper validation before confirmation

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Transfer Access**: Access to transfer operations
- **Confirmation Access**: Access to confirmation operations

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Transfer Workflow**: Understanding of transfer process
- **Request Management**: Knowledge of request selection and transfer
- **Transfer Management**: Knowledge of transfer creation and management
- **Confirmation Management**: Familiarity with confirmation save and rejection operations

## Usage Examples

### Basic Transfer Workflow

1. **Page Load**: Verify page loads with default data
2. **Transfer Selection**: Select transfer for request filtering
3. **Request Selection**: Select request for item loading
4. **Item Selection**: Select item from request items grid
5. **Batch Selection**: Select batch from batch popup
6. **Transfer Quantity Entry**: Enter transfer quantity
7. **Item Addition**: Add item to temporary transfer grid
8. **Repeat Items**: Add additional items as needed
9. **Transfer Save**: Save complete transfer records
10. **Confirmation**: Confirm transfer receipt

### Confirmation Workflow

1. **Transfer Selection**: Select transfer for confirmation
2. **Request Selection**: Select request for confirmation
3. **Item Review**: Review items in request items grid
4. **User Credentials Entry**: Enter user credentials for confirmation
5. **Confirmation**: Confirm transfer receipt
6. **Rejection**: Reject transfer receipt with reason

### Multi-Item Transfer Management

1. **Transfer Selection**: Select transfer for transfer
2. **Request Selection**: Select request for transfer
3. **Multiple Item Selection**: Select multiple items for transfer
4. **Batch Selection**: Select batch for each item
5. **Transfer Quantity Entry**: Enter transfer quantity for each item
6. **Item Addition**: Add all items to temporary transfer grid
7. **Transfer Save**: Save complete transfer with all items
8. **Transfer Verification**: Verify transfer is saved correctly